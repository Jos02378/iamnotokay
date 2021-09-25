import { instanceOf } from 'prop-types';
import { useEffect, useState } from 'react';

import loadToxicityClassifier from '../utils/toxicityClassifier';

export default function useToxicityClassifier() {
    const [toxicityModel, setToxicityModel] = useState({});

    useEffect(() => {
        loadToxicityClassifier().then((model) => {
            // console.log(model);
            setToxicityModel(model);
            console.log('Model Loaded Successfully...');
        });
    }, []);

    if (Object.keys(toxicityModel).length > 0) {
        return toxicityModel;
    } 
    return {};
}
