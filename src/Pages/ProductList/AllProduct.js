import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from '../../sass/AllProduct.module.scss'
import * as action from '../../redux/action/EcommerceAction'
import { Collapse, Radio, Space } from 'antd';
import ProductList from './ProductList'
export default function AllProduct() {
    const productAll = useSelector(state => state.ecommerceReducer.productAll)
    let [curPage, setCurpage] = useState(1)
    const limit = 6
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getAllProduct())
    }, [dispatch])
    console.log(productAll);
    // Filter
    let [filterPrice, setFilterPrice] = useState('')
    let [filterColor, setFilterColor] = useState('')
    let [filterSize, setFilterSize] = useState('')
    let [filterRating, setFilterRating] = useState('')

    // Paginate group
    const [activeClass, setActiveClass] = useState({
        activeObject: 0,
    });
   
    const pageNumber = []
    let totalProduct = productAll.length
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
    const { Panel } = Collapse
    
    let handleChangePrice = (e) => {
        setCurpage(1)
        setActiveClass({ ...activeClass, activeObject: 0 })
        setFilterPrice(e.target.value)

    }
    let handleChangeColor = (e) => {
        setCurpage(1)
        setActiveClass({ ...activeClass, activeObject: 0 })

        setFilterColor(e.target.value)
    }
    let handleChangeSize = (e) => {
        setCurpage(1)
        setActiveClass({ ...activeClass, activeObject: 0 })
        setFilterSize(e.target.value)
    }
    let handleChangeRating = (e) => {
        setCurpage(1)
        setActiveClass({ ...activeClass, activeObject: 0 })
        setFilterRating(e.target.value)
    }
    let reloadPage = () => {
        window.location.reload()
    }

    return (
        <div className={`container ${classes.allProductContainer}`}>
            <h3 className={classes.productTitle}>Product</h3>
            <div className={classes.productPosition}>
                <div className={classes.productFilter}>
                    <Collapse
                        defaultActiveKey={['1']}
                        expandIconPosition={"right"}
                    >
                        <Panel header="FILTER BY PRICE" key="1" >
                            <div className={classes.price}>
                                <Radio.Group id="ALo Group" onChange={handleChangePrice} >
                                    <Space direction="vertical">
                                        <Radio value={'under3Dollar'}  >1$ - 3$</Radio>
                                        <Radio value={'under6Dollar'}>4$ - 6$</Radio>
                                        <Radio value={'under9Dollar'}>7$ - 9$</Radio>
                                        <Radio value={'under12Dollar'}>10$ - 12$</Radio>
                                    </Space>
                                </Radio.Group>
                            </div>
                        </Panel>
                        <Panel header="FILTER BY COLOR" key="2" >
                            <div className={classes.color}>
                                <Radio.Group onChange={handleChangeColor}>
                                    <Space direction="vertical">
                                        <Radio value={'red'}>Red</Radio>
                                        <Radio value={'green'}>Green</Radio>
                                        <Radio value={'blue'}>Blue</Radio>

                                    </Space>
                                </Radio.Group>
                            </div>
                        </Panel>
                        <Panel header="FILTER BY SIZE" key="3">
                            <div className={classes.size}>
                                <Radio.Group onChange={handleChangeSize}>
                                    <Space direction="vertical">
                                        <Radio value={'M'}>Size M</Radio>
                                        <Radio value={'L'}>Size L</Radio>
                                        <Radio value={'X'}>Size X</Radio>
                                        <Radio value={'XS'}>Size XS</Radio>
                                    </Space>
                                </Radio.Group>
                            </div>
                        </Panel>
                        <Panel header="AVERAGE RATING" key="4" >
                            <div className={classes.review}>
                                <Radio.Group onChange={handleChangeRating}>
                                    <Space direction="vertical">
                                        <Radio value={'5'}>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                        </Radio>
                                        <Radio value={'4'}>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className={`fas fa-star mr-1 ${classes.nonStar}`} /></span>
                                        </Radio>
                                        <Radio value={'3'}>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className={`fas fa-star mr-1 ${classes.nonStar}`} /></span>
                                            <span ><i className={`fas fa-star mr-1 ${classes.nonStar}`} /></span>
                                        </Radio>
                                        <Radio value={'2'}>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className={`fas fa-star mr-1 ${classes.nonStar}`} /></span>
                                            <span ><i className={`fas fa-star mr-1 ${classes.nonStar}`} /></span>
                                            <span ><i className={`fas fa-star mr-1 ${classes.nonStar}`} /></span>
                                        </Radio>
                                        <Radio value={'1'}>
                                            <span ><i className="fas fa-star mr-1" /></span>
                                            <span ><i className={`fas fa-star mr-1 ${classes.nonStar}`} /></span>
                                            <span ><i className={`fas fa-star mr-1 ${classes.nonStar}`} /></span>
                                            <span ><i className={`fas fa-star mr-1 ${classes.nonStar}`} /></span>
                                            <span ><i className={`fas fa-star mr-1 ${classes.nonStar}`} /></span>
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
                <div className={classes.product}>
                    <div className={`productSort ${classes.productSort}`}>
                        <p className={`mb-0`}>Product List</p>
                       
                    </div>
                    <div>
                        {
                            !filterPrice && !filterColor && !filterSize && !filterRating ?
                                '' :
                                <div className={classes.filterCollection}>
                                    <button onClick={() => {
                                        reloadPage()
                                    }}>Clear Filter</button>
                                    <div className={classes.filterGroup}>

                                        {
                                            filterPrice === "under3Dollar" ? <p>Price : 1$ - 3$</p> : ''
                                        }
                                        {
                                            filterPrice === "under6Dollar" ? <p>Price : 4$ - 6$</p> : ''
                                        }
                                        {
                                            filterPrice === "under9Dollar" ? <p>Price : 7$ - 9$</p> : ''
                                        }
                                        {
                                            filterPrice === "under12Dollar" ? <p>Price : 10$ - 12$</p> : ''
                                        }

                                        {
                                            filterColor ? <p>Color : {filterColor}</p> : ''
                                        }
                                        {
                                            filterSize ? <p>Size : {filterSize}</p> : ''
                                        }
                                        {
                                            filterRating ? <p>Rating : {filterRating} <i className="fas fa-star" /></p> : ''
                                        }
                                    </div>
                                </div>
                        }
                        <ProductList
                            pageNumber={pageNumber}
                            curPage={curPage}
                            filterPrice={filterPrice}
                            filterSize={filterSize}
                            filterRating={filterRating}
                            filterColor={filterColor}
                            activeClass={activeClass}
                            handleSetActiveClass={handleSetActiveClass}
                            handleSetActiveNextAndPrevious={handleSetActiveNextAndPrevious}
                            handleActivePaginate={handleActivePaginate}
                            handleNextPaginate={handleNextPaginate}
                            handlePreviousPaginate={handlePreviousPaginate}
                            productPerPage={limit}></ProductList>
                    </div>
                </div>
            </div>
        </div>
    )
}
