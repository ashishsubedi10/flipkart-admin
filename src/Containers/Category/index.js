import React, { useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../../actions'
import Layout from '../../Components/Layout'
import Input from '../../Components/UI/Input'
import Modal from '../../Components/UI/Modal'

/**
* @author
* @function Category
**/

const Category = (props) => {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const category = useSelector(state => state.category);
    const dispatch = useDispatch()
    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form))
        // const cat = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // }

        setShow(false);
    }
    const handleShow = () => setShow(true);
    const renderCategories = (categories) => {
        let mycategories = [];
        for (let category of categories) {
            mycategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>

            )
        }
        return mycategories;
    }
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options
    }
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>

                    <Col md={12} >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                            <h3>Category</h3>
                            <Button variant="outline-primary" onClick={handleShow}>Add Category</Button>
                        </div>
                    </Col>

                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={`Add New Category`}
            >

                <Input
                    placeholder="Category Name"
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />

                <select
                    className="form-control"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}
                >
                    <option> Select Category </option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    }
                </select>
                <Input
                    type="file"
                    name="categoryImage"
                    onChange={handleCategoryImage}
                />

            </Modal>
        </Layout>

    )

}

export default Category