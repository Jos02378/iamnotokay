import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';
import { Maximize2, Heart, Share2, Flag, MessageSquare } from 'react-feather';
import moment from 'moment';

import './Collection.css';
import FirebaseContext from '../../contexts/firebaseContext';
import UserContext from '../../contexts/userContext';
import * as ROUTE from '../../constants/routes';
import sampleStories from '../../constants/sampleStories';
import { Text, Modal, PageLoader, PageShader } from '../../components';

const Collection = () => {
    const { firebase, FieldValue, FieldPath } = useContext(FirebaseContext);
    const user = useContext(UserContext);
    const history = useHistory();
    const db = firebase.firestore();
    const { id } = useParams();
    const [stories, setStories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentStory, setCurrentStory] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setStories(sampleStories);
    }, []);

    useEffect(() => {
        setCurrentStory(stories[currentIndex]);
    }, [stories, currentIndex]);

    const expandStory = (isInstantReplying) => {
        history.push({
            pathname: `/s/${currentStory?.id}`,
            state: { data: currentStory, isInstantReplying },
        });
    };

    return (
        <div className="collection__wrapper">
            <div className="collection__container">
                <div className="collection__container--upper">
                    <h2 className="collection__title">{currentStory?.title}</h2>
                    <div className="collection__icons">
                        <div className="collection__icons--item icon__message">
                            <MessageSquare
                                // className="collection__icons--item icon__message"
                                onClick={() => expandStory(true)}
                                color="#FFF"
                                strokeWidth={1}
                            />
                        </div>
                        <div className="collection__icons--item icon__heart">
                            <Heart
                                // className="collection__icons--item icon__heart"
                                onClick={() => console.log('THIS IS LIKE ICON')}
                                color="#FFF"
                                strokeWidth={1}
                            />
                        </div>
                        <div className="collection__icons--item icon__share">
                            <Share2
                                // className="collection__icons--item icon__share"
                                onClick={() => navigator.clipboard.writeText(window.location.href)}
                                color="#FFF"
                                strokeWidth={1}
                            />
                        </div>
                        <div className="collection__icons--item icon__flag">
                            <Flag
                                // className="collection__icons--item icon__flag"
                                onClick={() => console.log('THIS IS FLAG ICON')}
                                color="#FFF"
                                strokeWidth={1}
                            />
                        </div>
                    </div>
                </div>
                <div className="collection__info">
                    <p type="button" className="collection__owner">
                        {currentStory?.anonymous ? 'Anonymous' : currentStory?.owner?.fullname}
                    </p>
                    <p className="collection__date">{`• ${moment(currentStory?.timestamp).format(
                        'MMMM d, YYYY'
                    )}`}</p>
                </div>
                <p className="collection__desc">{currentStory?.story}</p>
                <PageShader height="30%" position="absolute" />
            </div>
            <div className="collection__buttons">
                {currentIndex > 0 && (
                    <button
                        onClick={() => setCurrentIndex((prev) => prev - 1)}
                        type="button"
                        className="collection__previous"
                    >
                        Previous
                    </button>
                )}
                <button
                    onClick={() => expandStory(false)}
                    type="button"
                    className="collection__open"
                >
                    Read this story
                </button>
                {currentIndex < stories.length - 1 && (
                    <button
                        onClick={() => setCurrentIndex((prev) => prev + 1)}
                        type="button"
                        className="collection__next"
                    >
                        Next
                    </button>
                )}
            </div>
            <PageLoader visible={isLoading} />
        </div>
    );
};

export default Collection;
