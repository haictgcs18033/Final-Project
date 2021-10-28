import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "../AdminCategory/AdminCategory.module.scss";
import * as action from "../../../redux/action/AdminAction";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { Skeleton } from "antd";

export default function AdminCategory() {
  const categoryList = useSelector((state) => state.adminReducer.categoryList);
  const loading = useSelector((state) => state.adminReducer.loading);
  const category = useSelector((state) => state.adminReducer.category);
  let [error, setError] = useState({
    name: "",
    categoryImage: "",
  });

  let initialError = {
    name: "",
    categoryImage: "",
  };
  // Validation Update
  let [valueUpdate, setValueUpdate] = useState({
    errorName: "",
    errorSelect: "",
  });
  let [valueUpdateExpand, setValueUpdateExpand] = useState({
    errorName: "",
    errorSelect: "",
  });
  let initialValueUpdate = {
    errorName: "",
    errorSelect: "",
  };
  let [checked, setChecked] = useState([]);
  let [expanded, setExpanded] = useState([]);
  let [checkedArray, setCheckedArray] = useState([]);
  let [expandedArray, setExpandedArray] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.getCatgory());
  }, [dispatch]);
  if (loading) {
    return (
      <div className={classes.load}>
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      </div>
    );
  }
  let renderCategory = (categoryList) => {
    let myCategory = [];
    if (categoryList) {
      for (let category of categoryList) {
        myCategory.push({
          label: category.name,
          value: category._id,
          children:
            category.children && category.children.length > 0
              ? renderCategory(category.children)
              : "",
        });
      }
    }

    return myCategory;
    // return categoryList && categoryList.map((category, index) => {

    //         return <li key={index} >
    //             {/* <button><i className="fa fa-angle-right" />
    //             </button> */}
    //             {category.name}

    //             {category.children && category.children.length > 0 ?
    //                 <ul>
    //                     {renderCategory(category.children)}
    //                 </ul> : ''
    //             }
    //         </li>

    // })
  };
  let handleInput = (e) => {
    let { value, name } = e.target;
    let newValues = { ...category };
    newValues[name] = value;
    if (name === "categoryImage") {
      if (
        e.target.files[0] &&
        !e.target.files[0].name?.match(/^.*\.(jpg|jpeg|png|gif)$/)
      ) {
        return alert("Please choose image");
      } else {
        newValues[name] = e.target.files[0];
      }
    }
    dispatch(action.handleInputAdmin(newValues));
  };

  let validation = () => {
    let nameMessage = "";
    let imageMessage = "";
    // First Name
    if (!category.name) {
      nameMessage = "Category name is not empty";
    }
    if (category.name.startsWith(" ") || category.name.endsWith(" ")) {
      nameMessage = "Not white space";
    }
    if (category.name.length > 30) {
      nameMessage = "Less than 30 character";
    }
    if (!category.categoryImage) {
      imageMessage = "Please choose image for category";
    }
    if (nameMessage || imageMessage) {
      setError({ name: nameMessage, categoryImage: imageMessage });
      return false;
    }
    return true;
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    let isValid = validation();
    if (isValid) {
      let categoryInput = { ...category };
      setError(initialError);
      window.$("#exampleModalCategory").modal("hide");
      dispatch(action.createCategory(categoryInput));
      dispatch({
        type: "RESET_FORM",
      });
    }
  };

  let renderCategoryList = (categoryList, option = []) => {
    if (categoryList) {
      for (let item of categoryList) {
        option.push({
          value: item._id,
          name: item.name,
          parentId: item.parentId,
          // type: item.type
        });
        if (item.children && item.children?.length > 0) {
          renderCategoryList(item.children, option);
        }
      }
    }
    return option;
  };
  let categoryOption = renderCategoryList(categoryList);
  let handleDataUpdate = () => {
    evaluateCheckAndExpandCategory();
    // console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };
  let handleDataDelete = () => {
    evaluateCheckAndExpandCategory();
  };
  const evaluateCheckAndExpandCategory = () => {
    let categories = renderCategoryList(categoryList);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.map((categoryId) => {
        const category = categories.find(
          (category) => category.value === categoryId
        );
        category && checkedArray.push(category);
        return setCheckedArray(checkedArray);
      });
    expanded.length > 0 &&
      expanded.map((categoryId) => {
        const category = categories.find(
          (category) => category.value === categoryId
        );
        category && expandedArray.push(category);
        return setExpandedArray(expandedArray);
      });
  };
  let handleUpdateCategoryInput = (key, value, indexExpanded, type) => {
    if (type === "checked") {
      const checkedUpdatedArray = checkedArray.map((item, index) =>
        index === indexExpanded ? { ...item, [key]: value } : item
      );
      setCheckedArray(checkedUpdatedArray);
    } else if (type === "expanded") {
      const expandedUpdatedArray = expandedArray.map((item, index) =>
        index === indexExpanded ? { ...item, [key]: value } : item
      );
      setExpandedArray(expandedUpdatedArray);
    }
  };
  let validationUpdate = (check, expand) => {
    let nameMessage = "";
    let selectMessage = "";
    // Expand
    let nameMessageExpand = "";
    let selectMessageExpand = "";
    for (let value of check) {
      if (!value.name) {
        nameMessage = "Category name is not empty";
      }
      if (value.name.startsWith(" ") || value.name.endsWith(" ")) {
        nameMessage = "Not white space";
      }
      if (value.name.length > 30) {
        nameMessage = "Less than 30 character";
      }
      if (value.value === value.parentId) {
        selectMessage = "You can not update the category by itself";
      }
    }
    for (let value of expand) {
      if (!value.name) {
        nameMessageExpand = "Category name is not empty";
      }
      if (value.name.startsWith(" ") || value.name.endsWith(" ")) {
        nameMessageExpand = "Not white space";
      }
      if (value.name.length > 30) {
        nameMessageExpand = "Less than 30 character";
      }
      if (value.value === value.parentId) {
        selectMessageExpand = "You can not update the category by itself";
      }
    }
    if (nameMessageExpand || selectMessageExpand) {
      setValueUpdateExpand({
        errorName: nameMessageExpand,
        errorSelect: selectMessageExpand,
      });
      return false;
    }
    if (nameMessage || selectMessage) {
      setValueUpdate({ errorName: nameMessage, errorSelect: selectMessage });
      return false;
    }
    return true;
  };
  let handleUpdateCategory = (check, expand) => {
    let isValid = validationUpdate(check, expand);
    if (isValid) {
      window.$("#exampleModalUpdate").modal("hide");
      dispatch(action.UpdateCategory(check, expand));
      setCheckedArray([]);
      setExpandedArray([]);
      setExpanded([]);
      setChecked([]);
      setValueUpdateExpand(initialValueUpdate);
      setValueUpdate(initialValueUpdate);
    }
  };

  let renderUpdateModal = () => {
    return (
      <div
        className="modal fade "
        id="exampleModalUpdate"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        // onSubmit={handleUpdateCategory}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className={`modal-body ${classes.modalBodyCategory}`}>
              <div className={`d-flex justify-content-between mb-4`}>
                <h4>Expanded Category</h4>
              </div>
              {expandedArray.length > 0 ? (
                expandedArray.map((item, index) => {
                  // console.log(item);
                  return (
                    <div
                      key={index}
                      className={`row mb-4 ${classes.expandGroup}`}
                    >
                      <div className={`form-group col-6`}>
                        <label>Category Name</label>
                        <input
                          className={`form-control`}
                          value={item.name}
                          onChange={(e) => {
                            handleUpdateCategoryInput(
                              "name",
                              e.target.value,
                              index,
                              "expanded"
                            );
                          }}
                        />
                        {valueUpdateExpand.errorName ? (
                          <div style={{ color: "red", margin: "10px" }}>
                            {valueUpdateExpand.errorName}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      {
                        <div className={`form-group col-6`}>
                          <label>Select Category Group</label>
                          <select
                            className={`form-control`}
                            name="parentId"
                            value={item.parentId}
                            onChange={(e) => {
                              handleUpdateCategoryInput(
                                "parentId",
                                e.target.value,
                                index,
                                "expanded"
                              );
                            }}
                          >
                            <option value={``}>New Category</option>
                            {categoryOption.map((option, index) => {
                              return (
                                <option key={index} value={option.value}>
                                  {option.name}
                                </option>
                              );
                            })}
                          </select>
                          {valueUpdateExpand.errorSelect ? (
                            <div style={{ color: "red", margin: "10px" }}>
                              {valueUpdateExpand.errorSelect}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      }

                      {/* <div className="form-group col-4">
                                            <label>Category Type</label>
                                            <select className="form-control"
                                                value={item.type}
                                                onChange={(e) => { handleUpdateCategoryInput('type', e.target.value, index, 'expanded') }}>
                                                <option>Select Type</option>
                                                {
                                                    categoryOption.map((option, index) => {
                                                        return option.parentId ? ''
                                                            : <option key={index} value={option.name}>{option.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div> */}
                    </div>
                  );
                })
              ) : (
                <p>There is no expanded item</p>
              )}
              <div className={`d-flex justify-content-between mb-4`}>
                <h4>Check Category</h4>
              </div>

              {checkedArray.length > 0 ? (
                checkedArray.map((item, index) => {
                  return (
                    <div key={index} className={`row ${classes.expandGroup}`}>
                      <div className={`form-group col-6`}>
                        <label>Category Name</label>
                        <input
                          className={`form-control`}
                          name="name"
                          value={item.name}
                          onChange={(e) => {
                            handleUpdateCategoryInput(
                              "name",
                              e.target.value,
                              index,
                              "checked"
                            );
                          }}
                        />
                        {valueUpdate.errorName ? (
                          <div style={{ color: "red", margin: "10px" }}>
                            {valueUpdate.errorName}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      {
                        <div className={`form-group col-6`}>
                          <label>Select Category Group</label>
                          <select
                            className={`form-control`}
                            name="parentId"
                            value={item.parentId}
                            onChange={(e) => {
                              handleUpdateCategoryInput(
                                "parentId",
                                e.target.value,
                                index,
                                "checked"
                              );
                            }}
                          >
                            <option value={``}>New Category</option>
                            {categoryOption.map((option, index) => {
                              return (
                                <option key={index} value={option.value}>
                                  {option.name}
                                </option>
                              );
                            })}
                          </select>
                          {valueUpdate.errorSelect ? (
                            <div style={{ color: "red", margin: "10px" }}>
                              {valueUpdate.errorSelect}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      }

                      {/* {
                                            <div className="form-group col-4">
                                                <label>Category Type</label>
                                                <select className="form-control"
                                                    value={item.type}
                                                    onChange={(e) => { handleUpdateCategoryInput('type', e.target.value, index, 'checked') }}>
                                                    <option>Select Type</option>
                                                    {
                                                        categoryOption.map((option, index) => {
                                                            return option.parentId ? ''
                                                                : <option key={index} value={option.name}>{option.name}</option>
                                                        })
                                                    }

                                                </select>
                                            </div>
                                        } */}
                    </div>
                  );
                })
              ) : (
                <p>There is no checked item</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  handleUpdateCategory(checkedArray, expandedArray);
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  let handleDeleteItemCheck = (itemId) => {
    let checkedArrayUpdate = [...checkedArray];
    let index = checkedArrayUpdate.findIndex((id) => id.value === itemId);
    if (index !== -1) {
      checkedArrayUpdate.splice(index, 1);
    }
    setCheckedArray((checkedArray = checkedArrayUpdate));
  };

  let renderDeleteModal = () => {
    return (
      <div
        className="modal fade "
        id="exampleModalDelete"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className={`modal-body ${classes.modalBodyCategoryDelete}`}>
              <h4>Check</h4>
              {checkedArray.length > 0 ? (
                checkedArray.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`d-flex justify-content-between ${classes.expandedDelete}`}
                    >
                      <p>{item.name}</p>
                      <i
                        className="fas fa-times"
                        onClick={() => {
                          handleDeleteItemCheck(item.value);
                        }}
                      />
                    </div>
                  );
                })
              ) : (
                <p>There is no category for deleting</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  handleDeleteCategory();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  let handleDeleteCategory = () => {
    let checkedItem = checkedArray.map((item) => ({ _id: item.value }));
    // let expandedItem = expandedArray.map((item) => ({ _id: item.value }))
    // let itemArray = expandedItem.concat(checkedItem)
    if (checkedItem.length > 0) {
      dispatch(action.deleteCategory(checkedItem));
    }
  };
  return (
    <div className={` ${classes.categoryContainer}`}>
      <div
        className={`d-flex justify-content-between ${classes.categoryTitle}`}
      >
        <h3>Category</h3>
        <button
          type="button"
          className={`btn btn-primary ${classes.btnCreate}`}
          data-toggle="modal"
          data-target="#exampleModalCategory"
        >
          Create Category
        </button>
        {/* Modal */}
        <form
          className="modal fade"
          id="exampleModalCategory"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          onSubmit={handleSubmit}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Create Category
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className={`form-group`}>
                  <label className={classes.nameTitle}>Category Name</label>
                  <input
                    className={`form-control`}
                    name="name"
                    value={category.name}
                    onChange={handleInput}
                  />
                  {error.name ? (
                    <div style={{ color: "red", margin: "10px 0" }}>
                      {error.name}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={`form-group`}>
                  <label className={classes.typeTitle}>Category Group</label>
                  <select
                    className={`form-control`}
                    name="parentId"
                    onChange={handleInput}
                  >
                    <option value={``}>New Category</option>
                    {categoryOption.map((option, index) => {
                      return (
                        <option key={index} value={option.value}>
                          {option.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label className={classes.thumbnailTitle}>Thumbnails</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="categoryImage"
                    onChange={handleInput}
                  />
                  {error.categoryImage ? (
                    <div style={{ color: "red", margin: "10px 0" }}>
                      {error.categoryImage}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className={classes.categoryList}>
        <div className={`${classes.updateAndDeLete}`}>
          <button
            type="button"
            className={classes.deleteButton}
            data-toggle="modal"
            data-target="#exampleModalDelete"
            onClick={() => {
              handleDataDelete();
            }}
          >
            Delete Category
          </button>
          <button
            type="button"
            className={classes.updateButton}
            data-toggle="modal"
            data-target="#exampleModalUpdate"
            onClick={() => {
              handleDataUpdate();
            }}
          >
            Update Category
          </button>
          {renderUpdateModal()}
          {renderDeleteModal()}
        </div>
        <div className={classes.checkBoxContainer}>
          <CheckboxTree
            nodes={renderCategory(categoryList)}
            checked={checked}
            expanded={expanded}
            onCheck={(checked) => setChecked(checked)}
            onExpand={(expanded) => setExpanded(expanded)}
            icons={{
              check: <i className="fas fa-check-square" />,
              uncheck: <i className="far fa-check-square" />,
              halfCheck: <i className="far fa-check-square" />,
              expandClose: <i className="fas fa-angle-right" />,
              expandOpen: <i className="fas fa-angle-down" />,
            }}
          />
        </div>
      </div>
    </div>
  );
}
