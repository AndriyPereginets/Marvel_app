import ErrorMassage from '../components/errorMassage/ErrorMassage';
import Spiner from '../components/Spiner/Spiner';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (proces, Component, data) => {
    switch (proces) {
        case 'waiting':
            return <Skeleton/>;
            break; 
        case 'loading':
            return <Spiner/>;
            break;
        case 'confirmed': 
            return <Component data={data}/>;
            break;
        case 'error':
            return <ErrorMassage/>;
            break;
        default:
            throw new Error('Unexpected srate proces')
    }
}

export default setContent;