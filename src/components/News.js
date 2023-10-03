import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 6,
        // category: 'entertainment'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        // category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("This is constroctor");
        this.state = {
            articles: [], /*this.articles*/
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsKick - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews() {
        console.log("cmd");
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e0aab4bceaa64708b3f2ea43630136b1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    }

    async componentDidMount() {
        this.updateNews()
    }

    hendleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
    }

    hendlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e0aab4bceaa64708b3f2ea43630136b1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
    };

    render() {
        console.log("render");
        return (
            <>
                
                    <h1 className='text-center'>News Kick | Todays Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">


                            <div className="row">
                                {this.state.articles.map((element) => {
                                    return <div className="col-md-4" key={element.url}>
                                        <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                    {/* <div>
                        <div className="container d-flex justify-content-between">
                            <button disabled={this.state.page <= 1} type='button' className="btn btn-dark" onClick={this.hendlePrevClick}>&larr; Previous</button>
                            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className="btn btn-dark" onClick={this.hendleNextClick}>Next &rarr;</button>
                        </div>
                    </div> */}
                
            </>
        )
    }
}

export default News
