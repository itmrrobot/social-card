import "./NotFound.scss";
import { Flex, Typography } from "antd";
import notFoundImg from "../../assets/imgs/search-no-result.svg";

function NotFound() {
    
    return (
        <Flex vertical justify="center" align="center" gap={4} className="not-found-wrap">
            <img src={notFoundImg} alt="img-not-found" className="img-not-found" />
            <Typography.Text className="not-found-title">Sorry, no result found</Typography.Text>
            <Typography.Text className="not-found-desc">Try adjusting your search to find what you’re looking for.</Typography.Text>
        </Flex>
    )
}

export default NotFound;