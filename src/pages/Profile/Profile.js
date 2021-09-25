/* eslint-disable prettier/prettier */
import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Twitter,
  Instagram,
  Facebook,
  MessageCircle,
  Heart,
} from 'react-feather';

import './Profile.css';
import { Text } from '../../components';
import * as ROUTE from '../../constants/routes';
import FirebaseContext from '../../contexts/firebaseContext';
import UserContext from '../../contexts/userContext';

const Profile = () => {
  const { firebase } = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const history = useHistory();
  const db = firebase.firestore();
  const [stories, setStories] = useState([]);
  const [userData, setUserData] = useState(null);

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
    <div className='profile__wrapper'>
      <section className='profile__left'>
        <div className='profile-left__container'>
          <h1>{userData && userData.fullname}</h1>
          <h2 className='profile__email'>{userData && userData.email}</h2>
          <p>{userData && userData.bio}</p>

          <div className='profile__social'>
            <h2 className='profile__label'>Social Media Links</h2>
            {userData && (
              <a
                href={userData.socialMedia.twitter}
                target='_blank'
                className='profile__social--link'
              >
                <Twitter strokeWidth={1} className='icons' />
                Twitter
              </a>
            )}
            {userData && (
              <a
                href={userData.socialMedia.instagram}
                target='_blank'
                className='profile__social--link'
              >
                <Instagram strokeWidth={2} className='icons icon--white' />
                Instagram
              </a>
            )}
            {userData && (
              <a
                href={userData.socialMedia.facebook}
                target='_blank'
                className='profile__social--link'
              >
                <Facebook strokeWidth={1} className='icons' />
                Messenger
              </a>
            )}
          </div>

          <h2 className='profile__label'>Joined at</h2>
          <h3>
            {userData && userData.joined.toDate().toDateString().substring(4)}
          </h3>
        </div>

        {/* <div className='profile__edit'>Edit your profile</div> */}
      </section>
      <section className='profile__middle'>
        <div className='profile-middle__header'>
          <h2>Stories</h2>
        </div>
        <section className='profile__story--list'>
          <div className='profile__story--list--card'>
            <h2>Lorem ipsum dolor sit amet</h2>
            <h3>May 3, 2021</h3>
            <div className='profile__social profile__profile__story--links'>
              <div className='profile__social--link profile__story--link'>
                <MessageCircle strokeWidth={1} className='icons icon--small' />8
              </div>
              <div className='profile__social--link profile__story--link'>
                <Heart strokeWidth={1} className='icons icon--small' />
                32
              </div>
            </div>
          </div>
          <div className='profile__story--list--card'>
            <h2>Lorem ipsum dolor sit amet</h2>
            <h3>May 3, 2021</h3>
            <div className='profile__social profile__profile__story--links'>
              <div className='profile__social--link profile__story--link'>
                <MessageCircle strokeWidth={1} className='icons icon--small' />8
              </div>
              <div className='profile__social--link profile__story--link'>
                <Heart strokeWidth={1} className='icons icon--small' />
                32
              </div>
            </div>
          </div>
          <div className='profile__story--list--card'>
            <h2>Lorem ipsum dolor sit amet</h2>
            <h3>May 3, 2021</h3>
            <div className='profile__social profile__profile__story--links'>
              <div className='profile__social--link profile__story--link'>
                <MessageCircle strokeWidth={1} className='icons icon--small' />8
              </div>
              <div className='profile__social--link profile__story--link'>
                <Heart strokeWidth={1} className='icons icon--small' />
                32
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className='profile__right'>
        <section className='profile__story'>
          <div className='profile__story--container' id='container_story'>
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. A
              assumenda, quisquam harum eum fuga voluptas laboriosam ipsa
              voluptatem cumque optio vel, ea sed impedit facere molestias cum.
              Rem, labore itaque? Ratione unde beatae nulla cum neque facere
              quidem obcaecati earum veritatis, doloribus qui in culpa ab
              voluptates vitae sequi voluptatibus accusantium tempore aliquam
              assumenda. Similique ex ipsam, suscipit fugiat necessitatibus
              harum possimus. Cumque velit a explicabo veniam unde repellendus,
              totam dolorum facere asperiores, tempora, fugit perspiciatis
              voluptatibus quibusdam iusto accusamus magnam nostrum laudantium
              libero eum suscipit! Debitis magni, impedit omnis inventore
              eveniet in quae ipsam ad consequuntur eaque quidem minima eius
              atque nulla deserunt totam tempora. Eligendi laudantium quos
              explicabo. Minus voluptatum quidem qui eos excepturi, a dolores
              inventore laudantium vitae impedit nemo est atque, obcaecati
              commodi placeat repudiandae. Odio voluptates quo libero nostrum?
              Perferendis dolorem rerum, harum ullam odit quia vel alias, quos
              ipsum cumque culpa cum, architecto nesciunt.
            </p>
          </div>
          <div className='profile__button--container'>
            <button className='read'>Read</button>
            <button className='delete'>Delete</button>
            <button className='edit'>Edit</button>
          </div>
        </section>
        <section className='profile__replies'>
          <div className='profile-right__header'>Replies</div>
          <section className='profile__replies--list'>
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
          </section>
        </section>
      </section>
    </div>
  );
};

export default Profile;
