/* eslint-disable prettier/prettier */
import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Twitter, Instagram, Facebook, MessageCircle, Heart } from 'react-feather';

import './Profile.css';
import { Text } from '../../components';
import * as ROUTE from '../../constants/routes';
import FirebaseContext from '../../contexts/firebaseContext';
import UserContext from '../../contexts/userContext';

const Profile = () => {
    const { firebase } = useContext(FirebaseContext);
    const history = useHistory();
    const db = firebase.firestore();
    const [stories, setStories] = useState([]);
    const [userData, setUserData] = useState(null);

    const [storyTitle, setStoryTitle] = useState(null);
    const [story, setStory] = useState(null);
    const [replies, setReplies] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        getStoriesId();
    }, []);

    const getStoriesId = () => {
        db.collection('account')
            .doc('IPM5IT9pLdgYeAAQ6lR8eWQrrln2')
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log('data', doc.data());
                    setUserData(doc.data());
                    doc.data().post_created.forEach((storyId) => {
                        getStoriesData(storyId);
                    });
                }
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
    };

    const getStoriesData = (id) => {
        db.collection('stories')
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const tempObj = { ...doc.data(), id };
                    console.log('tempObj', tempObj);
                    setStories((prev) => {
                        return [...prev, tempObj];
                    });
                }
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
    };

    const logOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                history.push(ROUTE.HOMEPAGE);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const formattedTime = (timestamp) => timestamp.toDate().toDateString().substring(4);

    const handleClick = (id) => {
        setCurrentIndex(id);
        setStoryTitle(stories[id].title);
        setStory(stories[id].story);
        setReplies(stories[id].replies);
    };

    // const renderStories = () => {
    //   console.log('stories', stories);
    //   stories.map((story, index) => {
    //     console.log('story', story);
    //     return (
    //       <div
    //         key={story?.id}
    //         className='profile__story--container'
    //         style={{ background: '#FFFFFF' }}
    //       >
    //         <p className='story__title'>{story?.title}</p>
    //         <button onClick={() => history.push(`/w/${story?.id}`)}>edit</button>
    //       </div>
    //     );
    //   });
    // };

    return (
        // <div className="profile__wrapper">
        //     <button onClick={logOut} type="button">
        //         <Text textSize="md" textColor="#000">
        //             LOG OUT
        //         </Text>
        //     </button>
        // </div>
        <div className="profile__wrapper">
            <section className="profile__left">
                <h1>{userData && userData.fullname}</h1>
                <h4>{userData && userData.email}</h4>
                <p>{userData && userData.bio}</p>
                <div className="profile__social">
                    <h2 className="profile__social--label">Social Media Links</h2>
                    {userData && (
                        <a
                            href={userData.socialMedia.twitter}
                            target="_blank"
                            className="profile__social--link"
                        >
                            <Twitter strokeWidth={1} className="profile__icons" />
                            Twitter
                        </a>
                    )}
                    {userData && (
                        <a
                            href={userData.socialMedia.instagram}
                            target="_blank"
                            className="profile__social--link"
                        >
                            <Instagram strokeWidth={1} className="profile__icons" />
                            Instagram
                        </a>
                    )}
                    {userData && (
                        <a
                            href={userData.socialMedia.facebook}
                            target="_blank"
                            className="profile__social--link"
                        >
                            <Facebook strokeWidth={1} className="profile__icons" />
                            Messenger
                        </a>
                    )}
                </div>

                <h2 className="profile__social--label">Joined at</h2>
                <h3>{userData && formattedTime(userData.joined)}</h3>
            </section>
            <section className="profile__middle">
                <div className="profile-middle__header">
                    <h2>Stories</h2>
                </div>
                <section className="profile__story--list">
                    {stories.map((data, index) => (
                        <div
                            className={`profile__story--list--card ${
                                index === currentIndex && 'profile__story--active'
                            }`}
                            key={data.id}
                            id={index}
                            onClick={() => handleClick(index)}
                        >
                            <h2>{data.title}</h2>
                            <h3>{formattedTime(data.timestamp)}</h3>
                            <div className="profile__social profile__story--ctas">
                                <div className="profile__story--cta">
                                    <MessageCircle
                                        strokeWidth={1}
                                        className="profile__icons icon--small"
                                    />
                                    {data.replies.length}
                                </div>
                                <div className="profile__story--cta">
                                    <Heart strokeWidth={1} className="profile__icons icon--small" />
                                    {data.like}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
            <section className="profile__right">
                <section className="profile__story">
                    <div className="profile__story--container" id="container_story">
                        <h2>{storyTitle && storyTitle}</h2>
                        <p>{story && story}</p>
                    </div>
                    <div className="profile__button--container">
                        <button className="read">Read</button>
                        <button className="delete">Delete</button>
                        <button className="edit">Edit</button>
                    </div>
                </section>
                <section className="profile__replies">
                    <div className="profile-right__header">Replies</div>
                    <section className="profile__replies--list">
                        {replies &&
                            replies.map((data) => (
                                <div className="profile__replies--list--card">
                                    <div>
                                        <h2>{data.name}</h2>
                                        <h3>{formattedTime(data.timestamp)}</h3>
                                    </div>
                                    <p>{data.comment}</p>
                                </div>
                            ))}
                        {/* 
            <div className='profile__replies--list--card'>
              <div>
                <h2>Jane Doe</h2>
                <h3>May 3, 2021</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                sit veritatis quae est itaque corporis quos labore dolorum.
                Optio dolore perspiciatis inventore suscipit vel natus nihil
                ducimus assumenda quaerat voluptates.
              </p>
            </div>
            <div className='profile__replies--list--card'>
              <div>
                <h2>Joseph Haryanto</h2>
                <h3>May 3, 2021</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                sit veritatis quae est itaque corporis quos labore dolorum.
                Optio dolore perspiciatis inventore suscipit vel natus nihil
                ducimus assumenda quaerat voluptates.
              </p>
            </div>
            <div className='profile__replies--list--card'>
              <div>
                <h2>Joseph Haryanto</h2>
                <h3>May 3, 2021</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                sit veritatis quae est itaque corporis quos labore dolorum.
                Optio dolore perspiciatis inventore suscipit vel natus nihil
                ducimus assumenda quaerat voluptates.
              </p>
            </div>
           */}
                    </section>
                </section>
            </section>
        </div>
    );
};

export default Profile;
