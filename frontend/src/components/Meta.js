import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) =>
{
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To Travell Spree',
    description: 'We provide the best packages for Great Destinations',
    keywords: 'packages, buy packages, cheap packages',
}

export default Meta