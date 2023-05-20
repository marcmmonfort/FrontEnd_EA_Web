import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Publication } from "../../models/publication.model";
import { PublicationService } from "../../services/publication.service";
import { AuthService } from "../../services/auth.service";

// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_3.jpg';
import './feed.page.css';
import { CommentService } from "../../services/comment.service";
import { Comment } from "../../models/comment.model";
import { UserService } from "../../services/user.service";
import { Link } from "react-router-dom";


const Feed = () => {

  const [listPublications, setListPublications] = useState<Publication[]>([]);
  const [listComments, setListComments] = useState<Comment[]>([]);
  const [numPagePublication, setNumPagePublication] = useState<number>(1);
  const [numPageComments, setNumPageComments] = useState<number>(1);
  const [showComments, setShowComments] = useState(false);
  const [selectedPublicationId, setSelectedPublicationId] = useState<string>("");
  const [commentButtonText, setCommentButtonText] = useState("Show Comments");
  const [commentsVisibility, setCommentsVisibility] = useState<{ [key: string]: boolean }>({});


  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    console.log("Iniciamos");
    const userId = AuthService.getCurrentUser();
    if(userId){
      PublicationService.feed(numPagePublication.toString(),userId)
      .then(response => {
        console.log(response);
        console.log(response.data);
        
        const initialVisibility = response.data.reduce((acc: { [key: string]: boolean }, publication: Publication) => {
          acc[publication._id] = false;
          return acc;
        }, {});
        setCommentsVisibility(initialVisibility);

        setListPublications(response.data);
      })
      .catch(error => {
        window.location.href = '*';
      });
    }
  }, [numPagePublication]);

  const handleLoadMore = () => {
    console.log("Has pulsado el btn");
    setNumPagePublication(prevPage => prevPage + 1);
    const userId = AuthService.getCurrentUser();
    console.log("HandleLoadMore:" + numPagePublication);
    if(userId){
      PublicationService.feed((numPagePublication).toString(), userId)
      .then(response => {
        console.log(response);
        console.log(response.data);
        setListPublications(prevPublications => [...prevPublications, ...response.data]);
      })
      .catch(error => {
        window.location.href = '*';
      });
    }
  }

  const getComments = (idPublication: string) => {
    console.log("Ver comentarios");
    setNumPageComments(prevPage => prevPage + 1);
    //setShowComments(true);
    setSelectedPublicationId(idPublication);
    setCommentsVisibility(prevVisibility => ({
      ...prevVisibility,
      [idPublication]: !prevVisibility[idPublication]
    }));
    //setShowComments(prevShowComments => !prevShowComments)
    if (idPublication === selectedPublicationId && !showComments) {
      setCommentButtonText("Hide Comments");
    } else {
      setCommentButtonText("Show Comments");
    }
    console.log("Page comentarios:" + numPageComments);
    CommentService.getCommentsPublication(idPublication, (numPageComments).toString())
      .then(response => {
        console.log(response);
        console.log(response.data);
        setListComments(prevComments=> [...prevComments, ...response.data]);
      })
      .catch(error => {
        //window.location.href = '*';
      });
  }

  return (
    <div>
      <Navbar />
      <div className="titleContainer">
        <h1 className="titleSection">Feed</h1>
      </div>
      <div className="feed">
        {listPublications.map((publication) => (
          <div className="post" key={publication._id}>

            <div className="post__header">
                <img className="post__profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="Profile"/>
                <div className="post__info">
                  <p className="post__username">{publication.idUserPublication.nameUser} {publication.idUserPublication.surnameUser}</p>
                  <p className="post__timestamp">{(publication.createdAt).toLocaleString()}</p>
                </div>
            </div>

            <div className="post__body">
              <p className="post__text">{publication.textPublication}</p>
              {publication.photoPublication.map((photo) => ( <img className="post__image" key={photo} src={photo} alt="Post"/> ))}
              <div style={{ textAlign: "center" }}>
                <button className="show__comments" onClick={() => { getComments(publication._id); }}>
                {publication._id === selectedPublicationId && commentsVisibility[publication._id] ? "Hide Comments" : "Show Comments"} {publication.commentsPublication?.length}
                </button>
              </div>
              {commentsVisibility[publication._id] && selectedPublicationId === publication._id &&  (
              <div> {listComments.map((comment) => ( 
                <div className="commentContainer" key={comment._id}>                  
                  
                  <Link to={`/user/${comment.idUserComment}`} className="user-link">
                    <div className="user">
                    {comment.idUserComment.photoUser ? (<img src={comment.idUserComment.photoUser} alt={comment.idUserComment.nameUser} className="user__profile-img" />) : (
                        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="user__profile-img" />
                      )}
                      <div className="user__info">
                        <p className="user__username">@{comment.idUserComment.appUser}</p>
                      </div>
                    </div>
                  </Link>
                  
                  <span className="commentText">{comment.textComment}</span>
                </div> ))}
              </div> )}
            </div>

          </div>
        ))}
        <div className="load-more">
          <button className="buttonLoadMore" onClick={handleLoadMore}>Load More</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Feed;