import classes from '../../sass/ProductPage.module.scss';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router'
import * as action from '../../redux/action/EcommerceAction'
import ProductCategoryList from './ProductCategoryList';
import { Select } from 'antd';
export default function ProductPage() {
    let productBySlug = useSelector(state => state.ecommerceReducer.productBySlug)
    let [curPage, setCurpage] = useState(1)
    const limit = 2
    let { slug } = useParams()
    let { categoryName } = useParams()
    let [sortObject, setSortObject] = useState('')
    console.log(productBySlug);

    let history = useHistory()
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getAllProductBySlug(slug, history))
    }, [dispatch, slug, history])
    // Paginate group
    const [activeClass, setActiveClass] = useState({
        activeObject: 0,
    });

    const pageNumber = []
    let totalProduct = productBySlug.length
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
    const { Option } = Select;
    let handleChange = (value) => {
        setCurpage(1)
        setActiveClass({ ...activeClass, activeObject: 0 })
        setSortObject(value)
    }
    return (
        <div className={`container ${classes.productContainer}`}>
            <div className={classes.productTitle}>
                <h3>{categoryName} Products </h3>
                <div className={`productSort`}>
                    <Select defaultValue="Sorting" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="ascending">Ascending</Option>
                        <Option value="descending">Descending</Option>
                        <Option value="newest" >
                            Newest
                        </Option>
                        <Option value="oldest">Oldest</Option>
                    </Select>
                </div>
            </div>

            <ProductCategoryList
                slug={slug}
                pageNumber={pageNumber}
                curPage={curPage}
                sortObject={sortObject}
                activeClass={activeClass}
                handleSetActiveClass={handleSetActiveClass}
                handleSetActiveNextAndPrevious={handleSetActiveNextAndPrevious}
                handleActivePaginate={handleActivePaginate}
                handleNextPaginate={handleNextPaginate}
                handlePreviousPaginate={handlePreviousPaginate}
                productPerPage={limit} />
        </div>
    )
}
