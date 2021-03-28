import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInput, setBlogData } from '../features/userSlice';
import "../styling/blogs.css"

const Blogs = () => {
    const searchInput = useSelector(selectUserInput)
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=2f6d8f18cbf21b23eeaa2eaea2a68840`
    const dispatch = useDispatch()

    const [blogs, setBlogs] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        axios.get(blog_url)
        .then(res => {
            dispatch(setBlogData(res.data))
            setBlogs(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }, [searchInput])
    return (
        <div className="blog__page">
            <h1 className="blog__page__header">Blogs</h1>
            {loading ? <h1 className="loading">Loading...</h1> : ""}
            <div className="blogs">
                {blogs?.articles?.map(blog => (
                    <a href={blog.url} target="_blank" className="blog">
                        
                            <img src={blog.image} alt={blog.title}/>
                            <div>
                                <h3 className="sourceName">
                                    <span>{blog.source.name}</span>
                                    <p>{blog.publishedAt}</p>
                                </h3>
                                <h1>{blog.title}</h1>
                                <p>{blog.description}</p>
                            </div>
                        
                    </a>
                ))}

                {blogs?.totalArticles === 0 && (
                    <h1 className="no__blogs">No blogs avialible. <img src="./sadly.png" alt="sad emoji" /> Search something else to read blogs on the greatest platform.</h1>
                )}
            </div>
        </div>
    )
}

export default Blogs
