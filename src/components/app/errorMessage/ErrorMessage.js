import img from '../errorMessage/error.gif'

const ErrorMessage = () => {
    return (
        <img src={img} style={{display: 'block', objectFit: 'contain', margin: '0 auto', height: '250px', width: '250px'}} />
    )
}

export default ErrorMessage