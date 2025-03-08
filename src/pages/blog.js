import React, { useState } from "react";
import AddBlog from "../blogs/addblog";
import AllBlogs from "../blogs/allblogs";
import { Container } from "@mui/material";


const Blog = () => {
    const [trigger, setTrigger] = useState(0);

    return (
        <div>
        <AddBlog setTrigger={setTrigger} />
        <Container>
        <AllBlogs trigger={trigger}/>
        </Container>
        </div>
    );
};

export default Blog;
