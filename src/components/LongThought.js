import React from 'react'
import * as matter from 'gray-matter';

// remark-react libraries 3
import MarkdownReact from 'react-markdown';

class LongThought extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            md: null,
            title: props.match.params.title,
            frontmatter: {
                layout: null,
                thumbnail: null,
                title: null,
                category: null,
                date: null,
                comments: null

            }
        }
    }

    componentDidMount() {
        var postTitle = this.state.title;
        console.log(postTitle)
        const mdr = require(`../posts/${postTitle}.md`)
        console.log(mdr)

        // markdown file to text then, put into state
        fetch(mdr)
            .then((res) => res.text())
            .then(text => {
                var loadMd = matter(text)
                console.log('loadMd', loadMd)
                var loadFrontmatter = loadMd
                    .data
                    console
                    .log('loadFrontmatter', loadFrontmatter)
                this.setState({
                    md: loadMd.content,
                    frontmatter: {
                        layout: loadFrontmatter.layout,
                        category: loadFrontmatter.category,
                        date: loadFrontmatter.date,
                        thumbnail: loadFrontmatter.thumbnail,
                        title: loadFrontmatter.title,
                        comments: loadFrontmatter.comments
                    }
                })
            })

    }

    render() {
        const {md, frontmatter} = this.state;
        console.log(this.props)
        console.log(this.state.frontmatter)
        

   
        return (
            
            <div className='post-card'>
                <header>
                    <h1>{frontmatter.title}</h1>
                    {/* <span className="badge pink">{frontmatter.category}</span> */}
                    {/* <date>{frontmatter.date}</date> */}
                </header>
                <MarkdownReact source={md}></MarkdownReact>
            </div>
        )
    }

}

export default LongThought;
