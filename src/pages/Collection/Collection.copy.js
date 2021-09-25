import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';
import { Maximize2, Heart, Share, Flag } from 'react-feather';

import './Collection.css';
import FirebaseContext from '../../utils/firebaseContext';
import UserContext from '../../utils/userContext';
import * as ROUTE from '../../constants/routes';
import sampleStories from '../../constants/sampleStories';
import { Text, Modal, PageLoader } from '../../components';

const Collection = () => {
    const { firebase, FieldValue, FieldPath } = useContext(FirebaseContext);
    const user = useContext(UserContext);
    const history = useHistory();
    const db = firebase.firestore();
    const { id } = useParams();
    const [stories, setStories] = useState([]);
    const [tempStories, setTempStories] = useState([]);
    const [idList, setIdList] = useState(['ok']);
    const [isLoading, setIsLoading] = useState(false);

    const randomizeArray = () => {
        const array = tempStories;

        let currentIndex = array.length,
            randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    };

    const getTenData = () => {
        return new Promise((resolve, reject) => {
            let newDate = new Date(2021, 6, 26);
            db.collection('stories')
                // .where(FieldPath.documentId(), 'not-in', idList)
                .where('timestamp', '>=', newDate)
                .orderBy('timestamp', 'desc')
                .limit(5)
                .onSnapshot((snapshot) => {
                    snapshot.forEach((doc) => {
                        let temp = {
                            id: doc.id,
                            data: doc.data(),
                        };
                        setTempStories(tempStories?.push(temp));
                        setIdList(idList?.push(doc.id));
                    });
                });
            console.log(tempStories, 'Get Ten Data');
            resolve('');
        });
    };

    /*
        Cara 1:
            1. pake timestamp untuk query berdasarkan date random. variable bisa, tinggal random date berdasarkan range
            2. filter di client side yang sama ga dipake. (bisa berapapa pun) (makin banyak data makin berat websitenya)
            3. pasti kalo ada yang sama data < 10 (contoh unique data ada 5)  
            4. query lagi sampe datanya ini ada 10 yang unique. per fetch ada (10 data yang baru)

            downsight: 
            - ngabisin read. 
        Cara 2:
            - langsung banyak ambil documentnya, randomize di client side

            downsight: 
            - ngabisin read. 
    */

    const parseData = () => {
        getTenData().then(() => {
            console.log(idList, 'idList ONE');
            // console.log(tempStories, 'okaodkfjakdjfalksdj');
            // const tempArray = randomizeArray();
            // console.log('tempArray ONE', tempArray);
        });

        setTimeout(() => {
            getTenData();
        }, 2000);

        // setTimeout(() => {
        //     getTenData();
        // }, 4000);
    };

    useEffect(() => {
        parseData();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <div className='story__wrapper'>
            <div className='story__container'>
                <div className='story__container--upper'>
                    <Text textSize='lg' textType='basic'>
                        {'INI JUDUL PAGE OKE JOSEPH'}
                    </Text>
                    <div className='story__icons'>
                        <Maximize2
                            className='story__icons--item'
                            onClick={() => console.log('THIS IS EXPAND ICON')}
                            color='#FFF'
                            strokeWidth={1}
                        />
                        <Heart
                            className='story__icons--item'
                            onClick={() => console.log('THIS IS LIKE ICON')}
                            color='#FFF'
                            strokeWidth={1}
                        />
                        <Share
                            className='story__icons--item'
                            onClick={() => console.log('THIS IS SHARE ICON')}
                            color='#FFF'
                            strokeWidth={1}
                        />
                        <Flag
                            className='story__icons--item'
                            onClick={() => console.log('THIS IS FLAG ICON')}
                            color='#FFF'
                            strokeWidth={1}
                        />
                    </div>
                </div>
            </div>
            <PageLoader visible={isLoading} />
        </div>
    );
};

export default Collection;
