import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../../../redux/action/AdminAction'
import classes from '../AdminPage/AdminPage.module.scss'
export default function AdminPage() {
    const categoryList = useSelector(state => state.adminReducer.categoryList)
    const page = useSelector(state => state.adminReducer.page)
    let { title, description,type, bannerImages, productImages } = page
    
    // console.log(page);

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getCatgory())
    }, [dispatch])

    let handleInput = (e) => {
        let { name, value } = e.target
        let newValues = { ...page }
        newValues[name] = value
        if (name === 'category') {
            newValues[name] = value
            let categoryItem = categoryList.find(category => category._id === value)
            type=categoryItem.type 
        }
        if (name === 'bannerImages') {
            newValues[name] = [...bannerImages, e.target.files[0]]
        }
        if (name === 'productImages') {
            newValues[name] = [...productImages, e.target.files[0]]
        }
        // console.log({...newValues,type});
        dispatch(action.handleInputAdmin({...newValues,type}))
    }
    let renderOption = (categoryList, option = []) => {
        if (categoryList) {
            for (let item of categoryList) {
                option.push({
                    value: item._id,
                    name: item.name,
                    parentId: item.parentId,
                    type: item.type
                })
                if (item.children && item.children?.length > 0) {
                    renderOption(item.children, option)
                }
            }
        }


        return option
    }

    let categoryOption = renderOption(categoryList)
    let handleSubmit = (e) => {
        e.preventDefault()
        let pageData = { ...page }
        console.log(pageData);
        dispatch(action.createPage(pageData))
    }
    // console.log(categoryOption);
    return (
        <div className={classes.pageContainer}>

            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Create Page
                </button>
                <form className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"
                    onSubmit={handleSubmit}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create New Page</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name Page</label>
                                    <input className="form-control" name="title" value={title}
                                        onChange={handleInput} />
                                </div>
                                <div className="form-group">
                                    <label>Page Description</label>
                                    <input className="form-control" name="description"
                                        value={description} onChange={handleInput} />
                                </div>
                                <div className="form-group">
                                    <label>Category type</label>
                                    <select className={`form-control`} name="category" onChange={handleInput}>
                                        <option>Choose type</option>
                                        {
                                            categoryOption.map((option, index) => {
                                                //   console.log(option.value);
                                                return <option key={index} value={option.value}
                                                >
                                                    {option.name}
                                                </option>
                                            })
                                        }

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Banner Image</label>
                                    <input type="file" className="form-control" name="bannerImages"
                                        onChange={handleInput} />

                                </div>
                                {bannerImages && bannerImages?.length > 0 ?
                                    bannerImages.map((image, index) => {
                                        return <p key={index}>{image.name}</p>
                                    }) : ''
                                }
                                <div className="form-group">
                                    <label>Product Image</label>
                                    <input type="file" className="form-control" name="productImages"
                                        onChange={handleInput} />
                                    {productImages?.length > 0 ?
                                        productImages.map((image, index) => {
                                            return <p key={index}>{image.name}</p>
                                        }) : ''
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
