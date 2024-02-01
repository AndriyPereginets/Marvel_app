import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";
import setContent from '../../utils/setContent';



const SinglePage = ({Component, dataType}) => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {proces, setProces, getComic, getCharacter, clearError} = useMarvelService();

        useEffect(() => {
            updateData()
        }, [id])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comic':
                    getComic(id).then(onDataLoaded)
                    .then(() => setProces('confirmed'));
                    break;
                case 'character':
                    getCharacter(id).then(onDataLoaded)
                    .then(() => setProces('confirmed'));
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }


        return (
            <>
                <AppBanner/>
                {setContent(proces, Component, data)}
            </>
        )
}

export default SinglePage;