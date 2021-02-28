import React, { useState } from 'react'
import Layout from '../../Components/Layout'
import { Col, Container, Row, Button, Table } from 'react-bootstrap'
import Input from '../../Components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../actions'
import Modal from '../../Components/UI/Modal'
import './style.css';
import { generatePublicUrl } from '../../urlConfig'


/**
* @author
* @function Products
**/

const Products = (props) => {
    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false)
    const [productDetails, setProductDetails] = useState(null)
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productPictures, setProductPictures] = useState('');
    const [categoryId, setCategoryId] = useState([]);
    const dispatch = useDispatch();
    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)
    const handleClose = () => {
        const form = new FormData()
        form.append('name', name);
        form.append('price', price);
        form.append('description', description);
        form.append('quantity', quantity);
        form.append('category', categoryId);
        for (let pic of productPictures) {
            form.append('productPicture', pic)
        }
        dispatch(addProduct(form))

        setShow(false);
    }
    const handleShow = () => setShow(true);
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options
    }
    const handleProductImage = (e) => {

        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ])
    }
    const renderProduct = () => {
        return (
            <Table style={{ fontSize: '12px' }} responsive="sm">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map(product =>
                                <tr onClick={() => showProductDetailModal(product)} key={product._id}>
                                    <td>1</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category.name}</td>
                                </tr>
                            ) : null
                    }

                </tbody>
            </Table>
        )
    }
    const renderAddProductModel = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={`Add New product`}
            >
                <Input
                    label="Name"
                    placeholder="Product Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="Price"
                    placeholder="Enter price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    label="Quantity"
                    placeholder="Enter Quantity"
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    label="Description"
                    placeholder="Product Name"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className="form-control"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option> Select Category </option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    }
                </select>
                {
                    productPictures.length > 0 ?
                        productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                }
                <Input
                    type="file"
                    name="productPictures"
                    onChange={handleProductImage}
                />
            </Modal>

        )
    }
    const handleCloseProductDetailModal = () => {
        setProductDetailModal(false)

    }
    const showProductDetailModal = (product) => {
        setProductDetails(product)
        setProductDetailModal(true)
        console.log(product)
    }
    const renderProductDetailsModal = () => {
        if (!productDetails) {
            return null
        }
        return (
            <Modal
                show={productDetailModal}
                handleClose={handleCloseProductDetailModal}
                modalTitle={`Product Details`}
                size="lg"
            >
                <Row>
                    <Col md="6">
                        <label className='key'>Name</label>
                        <p className='value'>{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className='key'>Price</label>
                        <p className='value'>{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className='key'>Quantity</label>
                        <p className='value'>{productDetails.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className='key'>Category</label>
                        <p className='value'>{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className='key'>Description</label>
                        <p className='value'>{productDetails.description}</p>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <label className='key'>Product Picture</label>
                        <div style={{ display: 'flex' }}>
                            {
                                productDetails.productPictures.map(picture =>
                                    <div className='productImgContainer'>
                                        <img src={generatePublicUrl(picture.img)} />
                                    </div>
                                )

                            }
                        </div>

                    </Col>

                </Row>


            </Modal>
        )
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>

                    <Col md={12} >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                            <h3>Product</h3>
                            <Button variant="outline-primary" onClick={handleShow}>Add Product</Button>
                        </div>
                    </Col>

                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col>
                        {
                            renderProduct()
                        }
                    </Col>
                </Row>
            </Container>
            {renderAddProductModel()}
            {renderProductDetailsModal()}
        </Layout>
    )

}

export default Products