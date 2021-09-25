import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';

import './Write.css';
import FirebaseContext from '../../contexts/firebaseContext';
import UserContext from '../../contexts/userContext';
import * as ROUTE from '../../constants/routes';
import { Text, Modal } from '../../components';
import useScreenSize from '../../hooks/useScreenSize';

function Write() {
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const user = useContext(UserContext);
    const history = useHistory();
    const { id } = useParams();
    const db = firebase.firestore();
    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isCancel, setIsCancel] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState({
        titleError: '',
        storyError: '',
    });
    const screenSize = useScreenSize();
    const spaceRegex = /\w+/g;

    useEffect(() => {
        checkId(id);
    }, [id]);

    const checkId = (id) => {
        db.collection('stories')
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const { title, story, anonymous } = doc.data();
                    setTitle(title);
                    setStory(story);
                    setIsAnonymous(anonymous);
                } else {
                    history.push('/w/new');
                }
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
    };

    const onCancel = (event) => {
        event.preventDefault();

        setTitle('');
        setStory('');
        setIsAnonymous(false);
        history.push(ROUTE.PROFILE);
    };

    const updateStory = (event) => {
        event.preventDefault();

        try {
            db.collection('stories')
                .doc(id)
                .update({
                    title: title,
                    story: story,
                    anonymous: isAnonymous,
                })
                .then(() => {
                    setSuccess('Your story has been updated');
                    setTitle('');
                    setStory('');
                    setIsAnonymous(false);
                    history.push(ROUTE.PROFILE);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const updatePostCreated = (id) => {
        db.collection('account')
            .doc(user.uid)
            .update({
                post_created: FieldValue.arrayUnion(id),
            })
            .then(() => {
                setSuccess('Your story is published');
                setTitle('');
                setStory('');
                setIsAnonymous(false);
                history.push(ROUTE.PROFILE);
            });
    };

    const handlePublish = (event) => {
        event.preventDefault();

        try {
            db.collection('stories')
                .add({
                    title: title,
                    story: story,
                    anonymous: isAnonymous,
                    owner: user.uid,
                    timestamp: FieldValue.serverTimestamp(),
                })
                .then((docRef) => {
                    // console.log('Document written with ID: ', docRef.id);
                    updatePostCreated(docRef.id);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkTitleLength();
    }, [title]);

    const checkTitleLength = () => {
        const words = title.match(spaceRegex);
        if (words != null && words.length == 0) {
            setError({
                ...error,
                titleError: `Please enter a title.`,
            });
        } else if (words != null && words.length > 15) {
            setError({
                ...error,
                titleError: `The maximum words for the title is 15 words.`,
            });
        } else {
            setError({
                ...error,
                titleError: ``,
            });
        }
    };

    useEffect(() => {
        checkStoryLength();
    }, [story]);

    const checkStoryLength = () => {
        const words = story.match(spaceRegex);
        if (words != null && words.length == 0) {
            setError({
                ...error,
                storyError: `Please enter your story.`,
            });
        } else if (words != null && words.length > 500) {
            setError({
                ...error,
                storyError: `The maximum words for the story is 500 words.`,
            });
        } else {
            setError({
                ...error,
                storyError: ``,
            });
        }
    };

    return (
        <>
            {isCancel ? (
                <Modal
                    title="Are you sure?"
                    buttons={[
                        {
                            text: 'No',
                            onClick: () => setIsCancel(false),
                        },
                        {
                            text: 'I am sure',
                            onClick: onCancel,
                        },
                    ]}
                />
            ) : null}
            <form className="write__wrapper" autoComplete="off">
                <div className="write__container">
                    <Text
                        textSize="sm"
                        textType="basic"
                        textColor="#FF2727"
                        otherStyles={{ alignSelf: 'flex-start' }}
                    >
                        {error.titleError}
                    </Text>
                    <input
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder="Title"
                        autoFocus={true}
                    />
                    <Text
                        textSize="sm"
                        textType="basic"
                        textColor="#FF2727"
                        otherStyles={{ alignSelf: 'flex-start' }}
                    >
                        {error.storyError}
                    </Text>
                    <textarea
                        value={story}
                        onChange={({ target }) => setStory(target.value)}
                        placeholder={`Write down your thoughts right here bud... Remember, don't go beyond 500 words`}
                        data-gramm_editor={false}
                    />
                </div>
                <div className={`write__buttons`}>
                    {id !== 'new' && (
                        <button
                            className="write__cancel"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsCancel(true);
                            }}
                            type="button"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            setIsAnonymous(!isAnonymous);
                        }}
                        type="button"
                        className={`write__anonymous${isAnonymous && ' active'}`}
                    >
                        Keep it anonymous
                    </button>
                    <button
                        onClick={id === 'new' ? handlePublish : updateStory}
                        type="submit"
                        className="write__submit"
                        disabled={
                            !title || !story || ((error?.titleError || error?.storyError) && true)
                        }
                    >
                        {id === 'new' ? 'Publish my story' : 'Update my story'}
                    </button>
                </div>
            </form>
        </>
    );
}

export default Write;
