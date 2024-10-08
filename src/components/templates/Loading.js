import { FadeLoader } from "react-spinners";

import { useLoading } from "../../hooks/LoadingContext";

const Loading = () => {

    const { loading } = useLoading();

    return (
        <>
            {loading?
                (<div style={style.loading}>
                    <FadeLoader
                        color="#8e8e93"
                        loading={loading}
                        cssOverride={override}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div> ): ('')
            }
        </>
    )
}
const override: CSSProperties = {
    display: "block",
    borderColor: "red",
};

const style = {
    loading: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',/* Màu nền mờ */
        zIndex: '9999', /* Đảm bảo ở trên cùng */
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}
export default Loading;