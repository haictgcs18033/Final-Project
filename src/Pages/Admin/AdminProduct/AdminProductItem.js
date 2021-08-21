import {  Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../../../redux/action/AdminAction'
import classes from '../AdminProduct/AdminProduct.module.scss'

const AdminProductItem = React.memo((props) => {
    let { curPage,
        productPerPage,
        pageNumber,
        handleActivePaginate,
        handleNextPaginate,
        searchTerm,
        sortObject,
        handlePreviousPaginate,
        handleSetActiveClass,
        activeClass,
        handleSetActiveNextAndPrevious } = props
    const dispatch = useDispatch()
    const paginateProduct = useSelector(state => state.adminReducer.paginateProduct)
    const loading = useSelector(state => state.adminReducer.loading)
    const categoryList = useSelector(state => state.adminReducer.categoryList)
    let [productState, setProduct] = useState({})
    let [productDelete, setProductDelete] = useState({
        productName: '',
        productId: ''
    })
    let [productUpdate, setProductUpdate] = useState({
        productId: '',
        name: '',
        price: '',
        productPictures: [],
        quantity: '',
        description: '',
        category: '',
        color: [],
        size: []
    })
    // Error validation
    let [error, setError] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        category: '',
        productPictures: '',
        color: '',
        size: '',
    })
    let initialValue = {
        name: '',
        price: '',
        quantity: '',
        description: '',
        category: '',
        productPictures: '',
        color: '',
        size: '',
    }
    let [inputFileKey, setInputFileKey] = useState({
        inputKey: ''
    })
    let { name, price, productPictures, quantity, description, category, color, size } = productUpdate
    let [colorKey, setColorKey] = useState('')
    let [sizeKey, setSizeKey] = useState('')
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
    useEffect(() => {
        dispatch(action.getProductPaginate(curPage, productPerPage, searchTerm, sortObject))
    }, [dispatch, curPage, productPerPage, searchTerm, sortObject])
    if (loading) {
        return <div className={`container-fluid ${classes.productContainer}`}>
            <div className={classes.createProduct}>
                <Skeleton active avatar paragraph={{ rows: 4 }} />
            </div>
        </div>
    }
    // Handle active class  
    const handleActiveClass = (index) => {
        handleSetActiveClass(index)
        let number = pageNumber[index] + 1
        handleActivePaginate(number)
    }
    const handleNextPage = () => {
        // pageNext=1
        let pageNext = activeClass.activeObject + 1
        handleSetActiveNextAndPrevious(pageNext)
        let number = pageNext + 1
        handleNextPaginate(number)
    }
    const handleBackPage = () => {
        let pagePrevious = activeClass.activeObject - 1
        handleSetActiveNextAndPrevious(pagePrevious)
        let number = pagePrevious + 1
        handlePreviousPaginate(number)
    }
    const handleChangeActive = (index) => {
        if (activeClass.activeObject === pageNumber[index]) {
            return classes.activeClassName
        } else {
            return ''
        }
    }
    let renderModalProduct = (product) => {
        return (
            <div className="modal fade" id="exampleModalProduct"
                tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg" role="document"  >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Product</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className={`modal-body ${classes.modalProductDetail}`}>
                            <p>
                                <span className={`mr-2 font-weight-bold`}>Name :</span>
                                <span> {product.name}</span>
                            </p>
                            <p>
                                <span className={`mr-2 font-weight-bold`}>Quantity :</span>
                                <span> {product.quantity}</span>
                            </p>
                            <p>
                                <span className={`mr-2 font-weight-bold`}>Price :</span>
                                <span> {product.price}</span>
                            </p>
                            <p>
                                <span className={`mr-2 font-weight-bold`}>Category :</span>
                                <span> {product.category?.name}</span>
                            </p>
                            <p>
                                <span className={`mr-2 font-weight-bold`}>Description :</span>
                                <span> {product.description}</span>
                            </p>

                            <p>
                                <span className={`mr-2 font-weight-bold`}>Product pictures :</span>
                            </p>
                            <div className={classes.pictureContainer}>
                                {product.productPictures && product.productPictures.map((picture, index) => {
                                    return <img key={index} className="mr-4" src={`${picture.img}`} alt="Not found" />
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    // Update Product
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

    let handleInputUpdate = (e) => {
        let { name, value } = e.target
        setProductUpdate({ ...productUpdate, [name]: value })
        if (name === 'productPictures') {
            setProductUpdate({ ...productUpdate, [name]: [...productPictures, e.target.files[0]] })
        }

    }
    let handleDeleteFile = (imgName) => {
        let productPicturesUpdate = [...productPictures]
        let index = productPicturesUpdate.findIndex(img => img.name === imgName)
        if (index !== -1) {
            productPicturesUpdate.splice(index, 1)
        }
        setInputFileKey({
            inputKey: Math.random().toString(10)
        })
        setProductUpdate({ ...productUpdate, productPictures: productPicturesUpdate })
    }
    let handleSelectColor = (e) => {
        if (e.target.value !== "Choose color") {
            setProductUpdate({ ...productUpdate, color: [...color, e.target.value] })
        }
    }
    let handleDeleteColor = (color) => {
        let colorUpdate = [...productUpdate.color]
        let index = colorUpdate.findIndex((colorState) => colorState === color)
        if (index !== -1) {
            colorUpdate.splice(index, 1)
        }
        setProductUpdate({ ...productUpdate, color: colorUpdate })
        setColorKey(Math.random(14).toString())
    }
    let handleSelectSize = (e) => {
        if (e.target.value !== "Choose size") {
            setProductUpdate({ ...productUpdate, size: [...size, e.target.value] })
        }

    }
    let handleDeleteSize = (size) => {
        let sizeUpdate = [...productUpdate.size]
        let index = sizeUpdate.findIndex((sizeState) => sizeState === size)
        if (index !== -1) {
            sizeUpdate.splice(index, 1)
        }
        setProductUpdate({ ...productUpdate, size: sizeUpdate })
        setSizeKey(Math.random(14).toString())
    }
    // Validation and update
    let validation = () => {
        let nameMessage = ''
        let categoryMessage = ''
        let colorMessage = ''
        let sizeMessage = ''
        let quantityMessage = ''
        let priceMessage = ''
        let productPictureMessage = ''
        let descriptionMessage = ''
        if (!productUpdate.name) {
            nameMessage = 'Product Name is not empty'
        }
        if (productUpdate.name.startsWith(" ") || productUpdate.name.endsWith(" ")) {
            nameMessage = 'Not white space'
        }
        if (productUpdate.name.length > 30) {
            nameMessage = 'Less than 30 character'
        }
        if (!productUpdate.category) {
            categoryMessage = "Please choose suitable category"
        }
        if (productUpdate.color.length === 0) {
            colorMessage = "Please choose color"
        }
        if (productUpdate.size.length === 0) {
            sizeMessage = "Please choose size"
        }
        // Quantity and price
        let regex = /^[0-9]*$/
        if (!regex.test(productUpdate.price)) {
            priceMessage = 'Please input only number'
        }
        if (!productUpdate.price) {
            priceMessage = "Please input product's price"
        }
        if (productUpdate.price.toString().startsWith(" ") || productUpdate.price.toString().endsWith(" ")) {
            priceMessage = 'Not white space'
        }
        if (productUpdate.price.length > 15) {
            priceMessage = "Less than 15 character"
        }
        // Quantity
        if (!regex.test(productUpdate.quantity)) {
            quantityMessage = 'Please input only number'
        }
        if (!productUpdate.quantity) {
            quantityMessage = "Please input product's quantity"
        }
        if (productUpdate.quantity.toString().startsWith(" ") || productUpdate.quantity.toString().endsWith(" ")) {
            quantityMessage = 'Not white space'
        }
        if (productUpdate.quantity.length > 15) {
            quantityMessage = "Less than 15 character"
        }
        if (productUpdate.productPictures.length === 0) {
            productPictureMessage = "Please choose product image"
        }
        if (!productUpdate.description) {
            descriptionMessage = 'Product description is not empty'
        }
        if (productUpdate.description.startsWith(" ") || productUpdate.description.endsWith(" ")) {
            descriptionMessage = 'Not white space'
        }
        if (nameMessage || categoryMessage || colorMessage || sizeMessage || quantityMessage || priceMessage || productPictureMessage || descriptionMessage) {
            setError({
                name: nameMessage,
                category: categoryMessage,
                color: colorMessage,
                size: sizeMessage,
                quantity: quantityMessage,
                price: priceMessage,
                productPictures: productPictureMessage,
                description: descriptionMessage
            })
            return false
        }
        return true
    }
    let handleUpdateProduct = (productUpdate) => {
        let isValid = validation()
        if (isValid) {
            console.log(productUpdate);
            window.$('#exampleModalUpdate').modal('hide'); 
            dispatch(action.updateProduct(productUpdate, curPage, productPerPage))
            setProductUpdate({
                ...productUpdate, color: [], size: [], productPictures: []
            })
            setError(initialValue)
        }


    }

    // Delete Product
    let handleDeleteProduct = (id) => {
        dispatch(action.deleteProduct(id, curPage, productPerPage))
    }
    // console.log(productPictures);

    return (
        <div className={`${classes.productItemContainer}`}>
            <div className={`${classes.paginateGroup}`}>
                <div>
                    {
                        paginateProduct.previous ?
                            <button className={`${classes.prev}`}
                                onClick={() => {
                                    handleBackPage()
                                }}
                            >
                                <i className="fa fa-angle-left" />
                            </button> :
                            ''
                    }

                    {
                        pageNumber.map((elements, index) => {
                            return <button key={index} className={`button ${handleChangeActive(index)}`}
                                onClick={() => { handleActiveClass(index) }}>{index + 1}</button>
                        })
                    }
                    {
                        paginateProduct.next ?
                            <button className={`${classes.next}`} onClick={() => {
                                handleNextPage()
                            }}>
                                <i className="fa fa-angle-right" />
                            </button> :
                            ''
                    }
                </div>


            </div>
            <div className={`row`}>
                {paginateProduct.paginate?.map((product, index) => {

                    return <div key={index} className={`col-12 col-md-4 col-lg-4 col-xl-3 mb-3`}>
                        <div className={`${classes.productItemObject}`}>
                            <div className={`card text-left ${classes.productItem}`}>
                                <img className="card-img-top"
                                    src={product.productPictures[0]?.img}
                                    // src={`${product.productPictures[0]?.img}`}
                                    alt="Not found" />
                                <div className="card-body">
                                    <h4 className="card-title font-weight-bold">{product.name}</h4>
                                    <p>
                                        <span className={`font-weight-bold`}>Price : </span>
                                        {product.price}</p>
                                    <p>
                                        <span className={`font-weight-bold`}>Category : </span>
                                        {product.category.name}</p>
                                </div>
                            </div>
                            <div className={classes.overlay}>
                                <button data-toggle="modal" data-target="#exampleModalProduct"
                                    onClick={() => {
                                        setProduct(product);
                                    }}>View</button>
                                <button className={classes.updateButton}
                                    data-toggle="modal" data-target="#exampleModalUpdate"
                                    onClick={() => {
                                        setProductUpdate({
                                            ...productUpdate,
                                            productId: product._id,
                                            name: product.name,
                                            price: product.price,
                                            quantity: product.quantity,
                                            category: product.category._id,
                                            description: product.description,
                                        })
                                    }}
                                >Update</button>
                                <button className={classes.deleteButton}
                                    data-toggle="modal" data-target="#exampleModalDelete"
                                    onClick={() => {
                                        setProductDelete({
                                            productName: product.name,
                                            productId: product._id
                                        })
                                    }}
                                >Delete</button>
                            </div>

                        </div>
                    </div>
                })}
                <div className="modal fade"
                    id="exampleModalDelete"
                    role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ color: 'black', fontSize: "15px" }}>
                                Do you want to delete {productDelete.productName} ? <b>Nothing can be recovered</b>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal"
                                    onClick={() => {
                                        handleDeleteProduct(productDelete.productId)
                                    }}
                                >Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade"
                    id="exampleModalUpdate"
                    role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ color: 'black', fontSize: "15px" }}>
                                <div className={`${classes.updateGroup}`}>
                                    <div className={`d-flex`}>
                                        <div className={`form-group  w-100 mr-5`}>
                                            <label className={`font-weight-bold`}>Product Name</label>
                                            <input className={`form-control`} name="name" value={name}
                                                onChange={handleInputUpdate}></input>
                                            {error.name ? <div style={{ color: 'red', margin: '10px 0' }}>{error.name}</div> : ''}
                                        </div>
                                        <div className={`form-group  w-100`}>
                                            <label className={`font-weight-bold`}>Category</label>
                                            <select className={`form-control`} name="category" value={category} onChange={handleInputUpdate}>
                                                {
                                                    categoryOption.map((option, index) => {

                                                        return <option key={index} value={option.value} >
                                                            {option.name}
                                                        </option>
                                                    })
                                                }

                                            </select>
                                            {error.category ? <div style={{ color: 'red', margin: '10px 0' }}>{error.category}</div> : ''}
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
                                                color.length > 0 ?
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
                                            {error.color ? <div style={{ color: 'red', margin: '10px 0' }}>{error.color}</div> : ''}
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
                                                size.length > 0 ?
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
                                            {error.size ? <div style={{ color: 'red', margin: '10px 0' }}>{error.size}</div> : ''}
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`form-group  w-100 mr-5`}>
                                            <label className={`font-weight-bold`}>Product Price</label>
                                            <input className={`form-control`} onChange={handleInputUpdate}
                                                name="price"
                                                value={price}></input>
                                            {error.price ? <div style={{ color: 'red', margin: '10px 0' }}>{error.price}</div> : ''}
                                        </div>
                                        <div className={`form-group  w-100`}>
                                            <label>Product Quantity</label>
                                            <input className={`form-control`}
                                                name="quantity"
                                                value={quantity}
                                                onChange={handleInputUpdate}></input>
                                            {error.quantity ? <div style={{ color: 'red', margin: '10px 0' }}>{error.quantity}</div> : ''}
                                        </div>
                                    </div>
                                    <div >
                                        <div className={` w-100 `}>
                                            <p className={`font-weight-bold`}>Product Image</p>
                                            <input
                                                type="file"
                                                key={inputFileKey.inputKey}
                                                className="form-control"
                                                name="productPictures"
                                                onChange={handleInputUpdate}
                                            />
                                            {productPictures.length > 0 ?
                                                productPictures.map((img, index) => {
                                                    
                                                    return <div className={`d-flex justify-content-between`} key={index}>
                                                        <p className={`mb-0`}
                                                            style={{ lineHeight: '31px' }}
                                                        >{img?.name}</p>
                                                        <button
                                                            className={`${classes.deleteFile}`}
                                                            onClick={() => {
                                                                handleDeleteFile(img.name)
                                                            }}
                                                        >
                                                            <i className="fas fa-times" />

                                                        </button>
                                                    </div>
                                                })
                                                :
                                                ''
                                            }

                                            {error.productPictures ? <div style={{ color: 'red', margin: '10px 0' }}>{error.productPictures}</div> : ''}
                                        </div>

                                    </div>

                                    <div >
                                        <div className={`form-group  w-100 mr-5`}>
                                            <label className={`font-weight-bold`}>Product Description</label>
                                            <div className={`${classes.textAreaUpdate}`}>
                                                <textarea
                                                    id="productPicturesFile"
                                                    className={`form-control `}
                                                    name="description"
                                                    value={description}
                                                    onChange={handleInputUpdate}

                                                />
                                            </div>
                                            {error.description ? <div style={{ color: 'red', margin: '10px 0' }}>{error.description}</div> : ''}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary"
                                    onClick={() => {
                                        handleUpdateProduct(productUpdate)
                                    }}
                                >Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                {renderModalProduct(productState)}
            </div>
        </div>
    )
})
export default AdminProductItem
