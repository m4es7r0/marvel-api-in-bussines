import img from './error.gif'

const ErrorMassage = () => {
    return (
        <img src={img}
             style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}}
             alt='Error img' />
    )
}

// process.env.PUBLIC_URL + '/error.gif'; ===> если нужно достать статик файл из PUBLIC

export default ErrorMassage