import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from '../AdminProduct/AdminProduct.module.scss'
import * as action from '../../../redux/action/AdminAction'
import AdminProductItem from './AdminProductItem'

export default function AdminProduct() {
    const product = useSelector(state => state.adminReducer.product)

    const categoryList = useSelector(state => state.adminReducer.categoryList)
   

    const productList = useSelector(state => state.adminReducer.productList)
    let { name, price, quantity, description, productPictures, color, size } = product
    let [curPage, setCurpage] = useState(1)

    let limit = 4

    const [searchTerm, setSearchTerm] = useState({
        text: ''
    })
    const [sortCategory, setSortCategory] = useState(false)
    const [sortObject, setSortObject] = useState('')

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(action.getCatgory())
        dispatch(action.getProduct())
    }, [dispatch])
    let [inputFileKey, setInputFileKey] = useState({
        inputKey: ''
    })
    let [colorKey, setColorKey] = useState('')
    let [sizeKey, setSizeKey] = useState('')
    // Product Paginate
    const [activeClass, setActiveClass] = useState({
        activeObject: 0,
    });
    let pageNumber = []
    let totalProduct = productList.length
    for (let index = 0; index < Math.ceil(totalProduct / limit); index++) {
        pageNumber.push(index)
    }
    let handleSetActiveClass = (index) => {
        setActiveClass({ ...activeClass, activeObject: pageNumber[index] })

    }

    let handleSetActiveNextAndPrevious = (number) => {
        setActiveClass({ ...activeClass, activeObject: number })
    }
    let handleActivePaginate = (number) => {
        setCurpage(curPage = number)
    }
    let handleNextPaginate = async (number) => {
        await setCurpage(curPage = number)
    }
    let handlePreviousPaginate = (number) => {
        setCurpage(curPage = number)
    }
    // Handle Input Create
    let handleInput = (e) => {
        let { name, value } = e.target
        let newValues = { ...product }
        newValues[name] = value
        if (name === "productPictures") {
            if (!value) {
                newValues[name] = []
            } else {
                newValues[name] = [...productPictures, e.target.files[0]]
            }
        }

        dispatch(action.handleInputAdmin(newValues))

    }


    let renderOption = (categoryList, option = []) => {
        if (categoryList) {
            for (let item of categoryList) {
                option.push({
                    value: item._id,
                    name: item.name,
                    parentId: item.parentId
                })
                if (item.children && item.children?.length > 0) {
                    renderOption(item.children, option)
                }
            }
        }


        return option
    }
    let categoryOption = renderOption(categoryList)
    // console.log(productPictures);

    // Create Product
    let handleSubmit = () => {

        let productInfo = { ...product }
        dispatch(action.createProduct(productInfo, curPage, limit))

    }
    // Search Product
    let handleSearchTerm = (e) => {
        let { name, value } = e.target
        if (searchTerm.text !== null) {
            setSearchTerm({ ...searchTerm, [name]: value })
            setCurpage(curPage = 1)
            setActiveClass({ ...activeClass, activeObject: 0 })
            dispatch(action.getProductPaginate(curPage, limit, searchTerm.text))
        }
    }
    // Sort Product
    let handleSortAscending = (sortType) => {
        console.log(sortType);
        setCurpage(curPage = 1)
        setSortCategory(false)
        setActiveClass({ ...activeClass, activeObject: 0 })
        setSortObject('ascending')
        if (sortObject === 'ascending') {
            dispatch(action.getUserPaginate(curPage, limit, searchTerm.text, sortType))
        }
    }
    let handleSortDecending = (sortType) => {
        setCurpage(curPage = 1)
        setActiveClass({ ...activeClass, activeObject: 0 })
        setSortCategory(false)
        setSortObject('descending')
        if (sortObject === 'descending') {
            dispatch(action.getUserPaginate(curPage, limit, searchTerm.text, sortType))
        }
    }
    let handleSortNewest = (sortType) => {
        setCurpage(curPage = 1)
        setActiveClass({ ...activeClass, activeObject: 0 })
        setSortCategory(false)
        setSortObject('newest')
        if (sortObject === 'newest') {
            dispatch(action.getUserPaginate(curPage, limit, searchTerm.text, sortType))
        }
    }
    let handleSortOldest = (sortType) => {
        setCurpage(curPage = 1)
        setActiveClass({ ...activeClass, activeObject: 0 })
        setSortCategory(false)
        setSortObject('oldest')
        if (sortObject === 'oldest') {
            dispatch(action.getUserPaginate(curPage, limit, searchTerm.text, sortType))
        }
    }
    let handleSortCategory = (e) => {
        let { value } = e.target
        console.log(value);
        setCurpage(curPage = 1)
        setActiveClass({ ...activeClass, activeObject: 0 })
        setSortObject(value)
        dispatch(action.getUserPaginate(curPage, limit, searchTerm.text, value))
    }
    let deleteValueFileInput = () => {
        document.getElementById('selected').selected = true
        setColorKey(Math.random().toString(10))
        setSizeKey(Math.random().toString(10))
        setInputFileKey({
            inputKey: Math.random().toString(10)
        })
        dispatch({
            type: 'RESET_FORM'
        })
        dispatch({
            type: 'EMPTY_ARRAY'
        })
    }
    let handleDeleteFile = (imgName) => {
        setInputFileKey({
            inputKey: Math.random().toString(10)
        })
        dispatch({
            type: 'DELETE_FILE',
            data: imgName
        })


    }
    let colorArray = [
        {
            value: 'red',
            label: 'red',
        },
        {
            value: 'green',
            label: 'green',
        },
        {
            value: 'blue',
            label: 'blue',
        },
    ]
    let sizeArray = [
        {
            value: 'M',
            label: 'M'
        },
        {
            value: 'L',
            label: 'L'
        },
        {
            value: 'X',
            label: 'X'
        },
        {
            value: 'XS',
            label: 'XS'
        },
    ]

    let handleSelectColor = (e) => {

        if (e.target.value !== "Choose color") {

            dispatch({
                type: 'CHOOSE_COLOR',
                color: e.target.value
            })
        }
    }
    let handleDeleteColor = (color) => {
        setColorKey(Math.random().toString(20))
        dispatch({
            type: 'DELETE_COLOR',
            data: color
        })
    }
    let handleSelectSize = (e) => {
        if (e.target.value !== 'Choose size') {
            dispatch({
                type: 'CHOOSE_SIZE',
                size: e.target.value
            })
        }

    }
    let handleDeleteSize = (size) => {
     
        setSizeKey(Math.random().toString(20))
        dispatch({
            type: 'DELETE_SIZE',
            data: size
        })
    }
    
    return (
        <div className={classes.productContainer}>
            <div className={`d-flex justify-content-between ${classes.createProduct}`}>
                <h3 >Product</h3>
                <button className={`btn btn-primary ${classes.createProductBtn}`} data-toggle="modal" data-target="#exampleModalProductCreate"
                    onClick={() => { deleteValueFileInput() }}>
                    Create Product
                </button>
                <div className="modal fade" id="exampleModalProductCreate"
                    tabIndex={-1} role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                // onSubmit={handleSubmit}
                >
                    <div className="modal-dialog modal-lg" role="document"  >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ color: 'black', fontSize: "15px" }}>
                                <div className={`d-flex`}>
                                    <div className={`form-group  w-100 mr-5`}>
                                        <label className={`font-weight-bold`}>Product Name</label>
                                        <input className={`form-control`} name="name" value={name}
                                            onChange={handleInput} />
                                    </div>
                                    <div className={`form-group  w-100`}>
                                        <label className={`font-weight-bold`}>Category</label>
                                        <select className={`form-control`} name="category" onChange={handleInput}>
                                            <option id="selected">Choose value</option>
                                            {
                                                categoryOption.map((option, index) => {
                                                    //   console.log(option.value);
                                                    return <option key={index} value={option.value} >
                                                        {option.name}
                                                    </option>
                                                })
                                            }
                                        </select>
                                        {

                                        }
                                    </div>


                                </div>
                                <div className={`d-flex`}>
                                    <div className={`form-group  w-100 mr-5`}>
                                        <label className={`font-weight-bold`}>Color</label>
                                        <select key={colorKey} className={`form-control`} name="color" onChange={handleSelectColor}>
                                            <option id="selectedColor">Choose color</option>
                                            {
                                                colorArray.map((color, index) => {
                                                    return <option key={index} value={color.value} >
                                                        {color.label}
                                                    </option>
                                                })
                                            }
                                        </select>
                                        {
                                            color?.length > 0 ?
                                                color.map((color, index) => {
                                                    return <div key={index} className={`d-flex mb-2 justify-content-between`}>
                                                        <p className={`mb-0`} >You choose {color}</p>
                                                        <button
                                                            className={`${classes.deleteColorCreate}`}
                                                            onClick={() => {
                                                                handleDeleteColor(color)
                                                            }}
                                                        >
                                                            <i className="fas fa-times" />

                                                        </button>
                                                    </div>

                                                }) : ''
                                        }
                                    </div>
                                    <div className={`form-group  w-100`}>
                                        <label className={`font-weight-bold`}>Size</label>
                                        <select key={sizeKey} className={`form-control`} name="size" onChange={handleSelectSize}>
                                            <option id="selectedSize">Choose size</option>
                                            {
                                                sizeArray.map((size, index) => {
                                                    return <option key={index} value={size.value} >
                                                        {size.label}
                                                    </option>
                                                })
                                            }
                                        </select>
                                        {
                                            size?.length > 0 ?
                                                size.map((size, index) => {
                                                    return <div key={index} className={`d-flex mb-2 justify-content-between`}>
                                                        <p className={`mb-0`}>You choose {size}</p>
                                                        <button
                                                            className={`${classes.deleteSizeCreate}`}
                                                            onClick={() => {
                                                                handleDeleteSize(size)
                                                            }}
                                                        >
                                                            <i className="fas fa-times" />

                                                        </button>
                                                    </div>

                                                }) : ''
                                        }
                                    </div>
                                </div>

                                <div className="d-flex">
                                    <div className="form-group w-100 mr-5">
                                        <label className={`font-weight-bold ${classes.thumbnailTitle}`}>Price</label>
                                        <input
                                            type="input"
                                            className="form-control"
                                            name="price"
                                            value={price}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div className="form-group w-100">
                                        <label className={`font-weight-bold ${classes.thumbnailTitle}`}>Quantity</label>
                                        <input
                                            type="input"
                                            className="form-control"
                                            name="quantity"
                                            value={quantity}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className={`font-weight-bold ${classes.productPictures}`} >Image</label>
                                    <input
                                        type="file"
                                        id="productPicturesFile"
                                        key={inputFileKey.inputKey}
                                        className="form-control"
                                        name="productPictures"
                                        onChange={handleInput}
                                    />
                                    {
                                        productPictures?.length > 0 ?
                                            productPictures.map((img, index) => {
                                                return <div key={index} className={`d-flex justify-content-between`}>
                                                    <div >
                                                        <p className={`mb-0`}
                                                            style={{ lineHeight: '31px' }}
                                                        >{img?.name}</p>
                                                    </div>
                                                    <button
                                                        className={`${classes.deleteFileCreate}`}
                                                        onClick={() => {
                                                            handleDeleteFile(img.name)
                                                        }}
                                                    >
                                                        <i className="fas fa-times" />

                                                    </button>
                                                </div>

                                            }) : ''
                                    }
                                </div>
                                <div className="form-group">
                                    <label className={`font-weight-bold ${classes.thumbnailTitle}`}>Description</label>
                                    <div className={classes.textArea}>
                                        <textarea
                                            type="input"
                                            className="form-control"
                                            name="description"
                                            value={description}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal"
                                    onClick={() => {
                                        handleSubmit()
                                    }}
                                >Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.productList}>
                <div className={classes.sortAndSearch}>
                    <div className={` ${classes.sort}`}>
                        <button className={`  dropdown-toggle ${classes.dropdownButton}`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort Product
                        </button>
                        <div className={`dropdown-menu  ${classes.dropdownContent}`} aria-labelledby="dropdownMenuButton">
                            <p className="dropdown-item"
                                onClick={() => {
                                    handleSortAscending(sortObject)
                                }}>Ascending</p>
                            <p className="dropdown-item"
                                onClick={() => {
                                    handleSortDecending(sortObject)
                                }}>Descending</p>
                            <p className="dropdown-item"
                                onClick={() => {
                                    handleSortNewest(sortObject)
                                }}>Newest</p>
                            <p className="dropdown-item"
                                onClick={() => {
                                    handleSortOldest(sortObject)
                                }}>Oldest</p>
                            <p className="dropdown-item"
                                onClick={() => {
                                    setSortCategory(true)
                                }}>
                                Category
                            </p>
                        </div>
                        {
                            sortCategory ? <select id="select" className={`form-control ${classes.selectCategory}`} name="category" onChange={handleSortCategory}>
                                <option >Choose category</option>
                                {
                                    categoryOption.map((option, index) => {
                                        return <option key={index} value={option.name}
                                        >
                                            {option.name}
                                        </option>
                                    })
                                }

                            </select> : ''
                        }

                    </div>
                    <div className={classes.search}>
                        <div className={`form-group mb-0 ${classes.formSearch}`}>
                            <input className={`form-control`} name="text" value={searchTerm.text} placeholder="Search product name"
                                onChange={handleSearchTerm} />
                            <i className={`fa fa-search`} />
                        </div>
                    </div>
                </div>
                <div className={classes.producItemList}>
                    <AdminProductItem
                        pageNumber={pageNumber}
                        curPage={curPage}
                        searchTerm={searchTerm.text}
                        sortObject={sortObject}
                        activeClass={activeClass}
                        handleSetActiveClass={handleSetActiveClass}
                        handleSetActiveNextAndPrevious={handleSetActiveNextAndPrevious}
                        handleActivePaginate={handleActivePaginate}
                        handleNextPaginate={handleNextPaginate}
                        handlePreviousPaginate={handlePreviousPaginate}
                        productPerPage={limit} />
                </div>

            </div>

        </div >
    )
}
