
const dev = {
    api_clipr: {
        API_BASE_URL: "http://app.clipr.local:8888/api",
        TOKEN_ENDPOINT: "http://app.clipr.local:8888/oauth/v2/token"
    },
    aws_cdn: "http://app.landing.local:8888"
}

const staging = {
    api_clipr: {
        API_BASE_URL: "https://app.aws.clipr.co/api",
        TOKEN_ENDPOINT: "https://app.aws.clipr.co/oauth/v2/token"
    },
    aws_cdn: "https://dee78mez9gquu.cloudfront.net"
}

const prod = {
    api_clipr: {
        API_BASE_URL: "https://app.clipr.co/api",
        TOKEN_ENDPOINT: "https://app.clipr.co/oauth/v2/token"
    },
    api_giphy: {
        // Sandbox mode : 20k request per day
        API_KEY: "api_key=hob6IiP90kzZ5p3oejuIXiXwIqhYkVmv",
        BASE_URL: "https://api.giphy.com/v1",
        pagination: {
            dataKey: "data",        // Key name of response data containing the results
            param: "offset",        // The param name to use in query
            type: "length",         // Means we should query "from the Xth sticker"
            per_page: 24,
        },
        endpoint: {
            sticker: "/stickers/search?"
        },
        endpoint_default: {
            // When no search text provided
            sticker: "/stickers/trending?"
        }
    },
    api_pixabay: {
        // Sandbox mode : 5k request per hour
        API_KEY: "key=9512251-e467040217bcf2094b0ef186b",
        BASE_URL: "https://pixabay.com/api",
        pagination: {
            dataKey: "hits",        // Key name of response data containing the results
            param: "page",          // The param name to use in query
            type: "page",           // Means we should query "from the Xth page"
            per_page: 24,
        },
        // safesearch filter = exclude explicit content from results
        endpoint: {
            sticker: "/?image_type=vector&safesearch=true",
            image: "/?image_type=photo&orientation=vertical&safesearch=true",
            video: "/videos/?video_type=film&safesearch=true"
        },
        endpoint_default: {
            // When no search text provided
            sticker: "/?image_type=vector&q=like&safesearch=true",
            image: "/?image_type=photo&orientation=vertical&q=city&safesearch=true",
            video: "/videos/?video_type=film&q=city&safesearch=true"
        }
    },
    aws_cdn: "https://d2fzf01co41kzj.cloudfront.net",
    locale: {
        default: "fr",
        supported: ["en","fr"]
    }
}

const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : (process.env.REACT_APP_STAGE === 'staging' ?
        { ...prod, ...staging} : { ...prod, ...dev})

export default {
    // Add common config values here
    ...config
}
