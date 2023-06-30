import React, { useEffect, useState } from 'react'
import { getProducts, searchProduct } from '../../apis/Api';
import Card from '../../components/card/Card';
import { Link, useParams } from 'react-router-dom';

const Search = () => {

    const { query } = useParams();
    const [products, setProducts] = useState([]);

    

    useEffect(() => {
        searchProduct(searchQuery).then((res) => {
            setProducts(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    const handleSearch = (e) => {
        e.preventDefault();
        searchProduct(searchQuery).then((res) => {
            setProducts(res.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    const [searchQuery, setSearchQuery] = useState(query);

    return (
        <div className='container mt-3'>

            <div className="d-flex justify-content-between">
                <h3>Search & Filtering</h3>
                <form action="">
                    <input type="text" id="form12" onChange={(e) => setSearchQuery(e.target.value)} class="form-control mb-3" placeholder="Search products" />
                    <button onClick={handleSearch} type="submit" hidden class="btn btn-primary">Search</button>
                </form>


            </div>

            <p>
                <strong>Result for</strong> - "{searchQuery}"
            </p>
            <div class="row row-cols-1 row-cols-md-4 g-4">
                {
                    // if products is not empty
                    products.length > 0 ? (
                        products.map((product) => (
                            <Link to={`/products/${product._id}`} className='col'>
                                <Card product={product} />
                            </Link>
                        ))
                    ) : (
                        <div className="col">
                            <h3>No products found</h3>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Search