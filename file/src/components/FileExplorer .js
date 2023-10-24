import React, { useState } from "react";
import "./file.css";
import { FaFileMedical, FaFolderPlus, FaTrash } from "react-icons/fa";
import { BiRename } from "react-icons/bi";

const FileExplorer = () => {
  const initialFileSystem = {
    name: "Root",
    type: "folder",
    children: [
      {
        name: "Documents",
        type: "folder",
        children: [
          {
            name: "file1.txt",
            type: "file",
          },
        ],
      },
    ],
  };

  const [fileSystem, setFileSystem] = useState(initialFileSystem);

  const toggleDirectory = (directory) => {
    directory.expanded = !directory.expanded;
    setFileSystem({ ...fileSystem });
  };

  const deleteItem = (parentDirectory, item) => {
    if (item.type === "folder") {
      parentDirectory.children = parentDirectory.children.filter(
        (child) => child.name !== item.name
      );
    } else if (item.type === "file") {
      parentDirectory.children = parentDirectory.children.filter(
        (child) => child.name !== item.name
      );
    }
    setFileSystem({ ...fileSystem });
  };

  const renameItem = (directory, oldName, newName) => {
    const itemToRename = directory.children.find(
      (child) => child.name === oldName
    );
    if (itemToRename) {
      itemToRename.name = newName;
      setFileSystem({ ...fileSystem });
    }
  };

  const addItem = (directory, itemName, itemType) => {
    if (directory.type === "folder") {
      if (!directory.children) {
        directory.children = [];
      }

      if (itemType === "folder") {
        directory.children.push({
          name: itemName,
          type: itemType,
          children: [],
        });
      } else {
        directory.children.push({
          name: itemName,
          type: itemType,
        });
      }
      setFileSystem({ ...fileSystem });
    }
  };

  const renderDirectory = (directory) => (
    <li key={directory.name}>
      <span
        className={directory.type === "folder" ? "folder" : "file"}
        onClick={() => toggleDirectory(directory)}
      >
        {directory.name}
      </span>
      <button
        onClick={() =>
          addItem(directory, prompt("Enter folder/file name:"), "folder")
        }
      >
        <FaFolderPlus />
      </button>
      {directory.type === "folder" && (
        <button
          onClick={() => addItem(directory, prompt("Enter file name:"), "file")}
        >
          <FaFileMedical />
        </button>
      )}
      <button onClick={() => deleteItem(fileSystem, directory)}>
        <FaTrash />
      </button>

      <button
        onClick={() =>
          renameItem(
            fileSystem, // Pass the parent directory
            directory.name,
            prompt("Rename to:", directory.name)
          )
        }
      >
        <BiRename />
      </button>

      {directory.type === "folder" && directory.expanded && (
        <ul>
          {directory.children &&
            directory.children.map((child) => (
              <React.Fragment key={child.name}>
                {child.type === "folder"
                  ? renderDirectory(child)
                  : renderFile(child, directory)}
              </React.Fragment>
            ))}
        </ul>
      )}
    </li>
  );

  const renderFile = (file, parentDirectory) => (
    <li key={file.name}>
      <span className="file">{file.name}</span>
      <button onClick={() => deleteItem(parentDirectory, file)}>
        <FaTrash />
      </button>
      <button
        onClick={() =>
          renameItem(
            parentDirectory,
            file.name,
            prompt("Rename to:", file.name)
          )
        }
      >
        <BiRename />
      </button>
    </li>
  );

  return (
    <div className="file-explorer">
      <div className="directory-tree">
        <ul>{renderDirectory(fileSystem)}</ul>
      </div>

      <div className="content-area">
        {/* Right panel for file content and actions */}
      </div>
    </div>
  );
};

export default FileExplorer;
