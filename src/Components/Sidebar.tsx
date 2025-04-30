import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  Divider,
  Button,
  Input,
  Upload,
  message,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  CameraOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InfoCircleOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
// import { getVisitorId } from "../utils/visitor";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const [loading, setLoading] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // const visitorId = getVisitorId(); // still being used if needed

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleTitleClick = () => {
    navigate("/home");
  };

  const handleImageUpload = (file: RcFile): boolean => {
    setImageFile(file);
    return false;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (!textInput && !imageFile) {
      message.error("Please provide either an image or text input!");
      return;
    }

    const formData = new FormData();
    if (imageFile) formData.append("image", imageFile);
    if (textInput) formData.append("query", textInput);

    setLoading(true);
    try {
      const response = await fetch(`https://abgljmv-touristspotter-api.hf.space/api/recommendations`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const recommendations = await response.json();

      if (recommendations.length === 0) {
        message.info("No recommendations found.");
      } else {
        const dataToSave = {
          text: textInput,
          image: imageFile ? URL.createObjectURL(imageFile) : null,
        };
        localStorage.setItem("submittedData", JSON.stringify(dataToSave));
        message.success("Recommendations fetched successfully!");
        navigate("/result", { state: { recommendations } });
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      message.error("An error occurred while fetching recommendations.");
    } finally {
      setLoading(false);
      setSearchBarVisible(false); // Hide the search bar after submission
      setTextInput("");           // Clear the text input
      setImageFile(null);         // Clear the image file
    }
  };

  const handleSearchBarToggle = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setSearchBarVisible(false);
      }
    };
    if (searchBarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarVisible]);

  return (
    <div
      style={{
        width: collapsed ? 80 : 256,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
        backgroundColor: "#121212",
        color: "white",
      }}
    >
      <div
        style={{
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          transition: "all 0.3s ease",
        }}
      >
        {!collapsed && (
          <div
            style={{
              textAlign: "center",
              transition: "opacity 0.3s ease",
              flexGrow: 1,
              cursor: "pointer",
            }}
            onClick={handleTitleClick}
          >
            <i className="fa-solid fa-plane" /> Tourist Spotter
          </div>
        )}
        <Button
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined style={{ color: "#fff" }} />
            ) : (
              <MenuFoldOutlined style={{ color: "#fff" }} />
            )
          }
          onClick={toggleCollapse}
        />
      </div>
      <Divider style={{ margin: 0 }} />
      <Menu
        style={{ flex: 1, borderRight: 0 }}
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={[]}
      >
        <Menu.Item
          key="1"
          icon={<SearchOutlined style={{ color: "#fff" }} />}
          onClick={handleSearchBarToggle}
        >
          Search
        </Menu.Item>
        <Menu.Item key="2" icon={<CompassOutlined style={{ color: "#fff" }} />}>
          <Link to="/destinations" className="nav-text">
            Destinations
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<InfoCircleOutlined style={{ color: "#fff" }} />}>
          <Link to="/advisory" className="nav-text">
            Safety Advisory
          </Link>
        </Menu.Item>
      </Menu>
      {searchBarVisible && (
        <div
          className="search-bar"
          ref={searchBarRef}
          style={{
            position: "absolute",
            top: 50,
            left: collapsed ? 80 : 256,
            width: collapsed ? "calc(100% - 80px)" : "calc(100% - 256px)",
            padding: "10px",
            backgroundColor: "#f2f2f2",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <Upload
              showUploadList={false}
              beforeUpload={handleImageUpload}
              accept="image/*"
            >
              <Button icon={<CameraOutlined />} style={{ flexShrink: 0 }}>
                Add Image
              </Button>
            </Upload>
            <Input
              placeholder="Enter text to search..."
              style={{ flexGrow: 1 }}
              value={textInput}
              onChange={handleTextChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />

            <Button
              type="primary"
              icon={<SearchOutlined />}
              loading={loading}
              style={{ flexShrink: 0 }}
              onClick={handleSubmit}
            >
              Search
            </Button>
          </div>
          {imageFile && (
            <div style={{ marginTop: 8, fontSize: 12 }}>
              Selected Image: <strong>{imageFile.name}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
