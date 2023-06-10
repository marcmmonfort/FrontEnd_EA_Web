import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Publication } from "../../models/publication.model";
import { PublicationService } from "../../services/publication.service";
import { AuthService } from "../../services/auth.service";

// Fondo de pantalla personalizado ...
import backgroundImage from "../../assets/images/background_3.jpg";
import "./feed.page.css";
import { CommentService } from "../../services/comment.service";
import { Comment } from "../../models/comment.model";
import { UserService } from "../../services/user.service";
import { Link, useNavigate } from "react-router-dom";
import { FaComment, FaHeart } from "react-icons/fa";
import { useSpring, animated } from 'react-spring';


const Feed = () => {
  const [listPublications, setListPublications] = useState<Publication[]>([]);
  const [numPagePublication, setNumPagePublication] = useState<number>(1);
  const [commentsVisibility, setCommentsVisibility] = useState<{[key: string]: boolean; }>({});
  const [pageComments, setPageComments] = useState<{ [key: string]: number }>({});
  const [commentButton, setCommentButton] = useState<{ [key: string]: string }>({});
  const [listCommentsPublication, setListCommentsPublication] = useState<{ [key: string]: Comment[] }>({});
  const [showCommentForm, setShowCommentForm] = useState<{[key: string]: boolean; }>({});
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [recargar, setRecargar] = useState<string>('');
  const [numPublications, setNumPublications] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<{[key: string]: boolean; }>({});

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    console.log("Iniciamos");
    const userId = AuthService.getCurrentUser();
    if (userId) {
      PublicationService.feed(numPagePublication.toString(), userId)
        .then((response) => {
          console.log(response);
          console.log(response.data);

          const initialVisibility = response.data.reduce(
            (acc: { [key: string]: boolean }, publication: Publication) => {
              acc[publication.uuid] = false;
              return acc;
            },
            {}
          );
          setCommentsVisibility(initialVisibility);

          const initialPage = response.data.reduce(
            (acc: { [key: string]: number }, publication: Publication) => {
              acc[publication.uuid] = 1;
              return acc;
            },
            {}
          );
          setPageComments(initialPage);

          const initialCommentButton = response.data.reduce(
            (acc: { [key: string]: string }, publication: Publication) => {
              acc[publication.uuid] = "Show comments";
              return acc;
            },
            {}
          );
          setCommentButton(initialCommentButton);

          const initialListComments = response.data.reduce(
            (acc: { [key: string]: Comment[] }, publication: Publication) => {
              acc[publication.uuid] = [];
              return acc;
            },
            {}
          );
          setListCommentsPublication(initialListComments);

          const initialShowCommentButton = response.data.reduce(
            (acc: { [key: string]: boolean }, publication: Publication) => {
              acc[publication.uuid] = false;
              return acc;
            },
            {}
          );
          setShowCommentForm(initialShowCommentButton);

          const initialCommentText= response.data.reduce(
            (acc: { [key: string]: string }, publication: Publication) => {
              acc[publication.uuid] = "";
              return acc;
            },
            {}
          );
          setCommentText(initialCommentText);

          const initialShowLikes = response.data.reduce(
            (acc: { [key: string]: boolean }, publication: Publication) => {
              const hasLiked = publication.likesPublication?.includes(userId) || false;
              acc[publication.uuid] = hasLiked;
              return acc;
            },
            {}
          );
          setHasLiked(initialShowLikes);
          

          setListPublications(response.data);
      })
      .catch(error => {
        navigate("*");
      });

      PublicationService.numPublicationsFollowing(userId)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setNumPublications(response.data);
      })
      .catch(error => {
        navigate("*");
      });
    }
  }, [numPagePublication, recargar]);

  const handleLoadMore = () => {
    console.log("Has pulsado el btn");
    setNumPagePublication((prevPage) => prevPage + 1);
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
        navigate("*");
      });
    }
  };

  const getComments = (idPublication: string) => {
    console.log("Ver comentarios");
    console.log("idPublication: " + idPublication);
    console.log(
      "commentsVisibility[PublicationId]=" + commentsVisibility[idPublication]
    );
    console.log("pageComments[PublicationId]=" + pageComments[idPublication]);
    setCommentsVisibility((prevVisibility) => {
      const updatedVisibility = {
        ...prevVisibility,
        [idPublication]: !prevVisibility[idPublication],
      };
      console.log("second " + updatedVisibility[idPublication]);

      if (updatedVisibility[idPublication]) {
        setCommentButton((prevCommentButton) => ({
          ...prevCommentButton,
          [idPublication]: (prevCommentButton[idPublication] = "Hide Comments"),
        }));
        console.log("Entro a hide");
        CommentService.getCommentsPublication(idPublication, (pageComments[idPublication]).toString())
        .then(response => {
          console.log(response);
          console.log(response.data);
          setListCommentsPublication(prevListComments => ({
            ...prevListComments,
            [idPublication]: response.data
          }));
        })
        .catch(error => {
          navigate("*");
        });
      } else {
        setCommentButton((prevCommentButton) => ({
          ...prevCommentButton,
          [idPublication]: (prevCommentButton[idPublication] = "Show Comments"),
        }));
        console.log("Entro a show");
        setListCommentsPublication((prevListComments) => ({
          ...prevListComments,
          [idPublication]: [],
        }));
        setPageComments((prevPageComments) => ({
          ...prevPageComments,
          [idPublication]: (prevPageComments[idPublication] = 1),
        }));
      }
      return updatedVisibility;
    });
    console.log("Page comentarios:" + pageComments[idPublication]);
  };

  const showMoreComments = (idPublication: string) => {
    console.log("Ver más comentarios");
    setPageComments((prevPageComments) => ({
      ...prevPageComments,
      [idPublication]: prevPageComments[idPublication] + 1,
    }));
    CommentService.getCommentsPublication(
      idPublication,
      (pageComments[idPublication] + 1).toString()
    )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setListCommentsPublication((prevListComments) => ({
          ...prevListComments,
          [idPublication]: [
            ...prevListComments[idPublication],
            ...response.data,
          ],
        }));
      })
      .catch(error => {
        navigate("*");
      });
  };

  //Para escribir respuesta a publicación
  const handleToggleCommentForm = (idPublication:string) => {
    setShowCommentForm((prevShowComments) => ({
      ...prevShowComments,
      [idPublication]: !prevShowComments[idPublication],
    }));
  };

  const handleInputChange = (event:any, idPublication:string) => {
    setCommentText((prevCommentText) => ({
      ...prevCommentText,
      [idPublication]: prevCommentText[idPublication] = event.target.value,
    }));
  };

  const handleSubmit = (event:any, idPublication:string) => {
    event.preventDefault();

    // Lógica para enviar el comentario a la publicación
    const userId = AuthService.getCurrentUser();

    if(userId){
      const comment:Comment = {
        idUserComment: userId,
        idPublicationComment: idPublication,
        textComment: commentText[idPublication],
      };

      CommentService.createComment(comment)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          setRecargar("recargate");
        })
        .catch(error => {
          navigate("*");
        });
  
    }
    
    setCommentText((prevCommentText) => ({
      ...prevCommentText,
      [idPublication]: prevCommentText[idPublication] = "",
    }));
  };

  const handleLike = (idPublication:string) => {

    console.log("Handle Like" + idPublication);
    console.log("Handle Like" + hasLiked[idPublication]);
    const userId = AuthService.getCurrentUser();
    if(userId){
      if(hasLiked[idPublication]){

        setHasLiked((prevLikes) => ({
          ...prevLikes,
          [idPublication]: !prevLikes[idPublication],
        }));
        console.log("Handle Like True: " + hasLiked[idPublication]);
        PublicationService.deleteLike(idPublication, userId)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          setRecargar("recargate");
          console.log("Se ha recargado");
        })
        .catch(error => {
          navigate("*");
        });
  
      }else{
        setHasLiked((prevLikes) => ({
          ...prevLikes,
          [idPublication]: !prevLikes[idPublication],
        }));
        console.log("Handle Like False: " + hasLiked[idPublication]);

        
        PublicationService.updateLike(idPublication, userId)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          setRecargar("recargate");
          console.log("Se ha recargado");
        })
        .catch(error => {
          navigate("*");
        });
      }
    }

  }

  const heartAnimation = useSpring({
    from: { opacity: 0, y: 0 },
    to: { opacity: hasLiked ? 1 : 0, y: hasLiked ? -100 : 0 },
  });

  

  return (
    <div>
      <Navbar />
      <div className="titleContainer">
        <h1 className="titleSection">Feed</h1>
      </div>
      <div className="feed">
        {listPublications.map((publication) => (
          <div className="post" key={publication.uuid}>
            <Link to={`/user/${publication.idUser.uuid}`} className="user-link">
              <div className="post__header">
                <img className="post__profile-img" src={`${publication.idUser.photoUser}`} alt="Profile"/>
                  <div className="post__info">
                    <p className="post__username_header">{publication.idUser.nameUser} {publication.idUser.surnameUser}</p>
                    <p className="post__timestamp_header">{new Date(publication.createdAt).toLocaleString()}</p>
                  </div>
              </div>
            </Link>
            <div className="post__body">
              {publication.photoPublication.map((photo) => (
                <img
                  className="post__image"
                  key={photo}
                  src={photo}
                  alt="Post"
                />
              ))}
              
              <p className="post__text">{publication.textPublication}</p>
              <div style={{ textAlign: "center" }}>
                <button
                  className="show__comments"
                  onClick={() => {
                    getComments(publication.uuid.toString());
                  }}
                >
                  {commentsVisibility[publication.uuid]}{" "}
                  {commentButton[publication.uuid]}{" "}
                  {publication.commentsPublication?.length}
                </button>
                <div className="comment-icon" onClick={() => {handleToggleCommentForm(publication.uuid.toString());}}>
                <FaComment></FaComment>
              </div>
              {showCommentForm[publication.uuid] && (
                <form onSubmit={(event) => {handleSubmit(event, publication.uuid.toString());}}>
                  <input type="text" value={commentText[publication.uuid]} onChange={(event) => {handleInputChange(event, publication.uuid.toString());}}/>
                  <button type="submit">Send Comment</button>
                </form>
              )}
              </div>
              <div className="likes-info">
                <span className={hasLiked[publication.uuid] ? "liked" : ""}><Link  to={`/profile/userList/${publication.uuid}/likes`}>{publication.likesPublication?.length}</Link></span>
                <FaHeart onClick={() => {handleLike(publication.uuid.toString());}} className={hasLiked[publication.uuid] ? "liked" : ""} />
              </div>
              {commentsVisibility[publication.uuid] && (
                <div>
                  {" "}
                  {listCommentsPublication[publication.uuid].map((comment) => (
                    <div className="commentContainer_2" key={comment.uuid}>
                      <Link
                        to={`/user/${comment.idUserComment.uuid}`}
                        className="user-link"
                      >
                        <div className="user_2">
                          {comment.idUserComment.photoUser ? (
                            <img
                              src={comment.idUserComment.photoUser}
                              alt={comment.idUserComment.nameUser}
                              className="user__profile-img_2"
                            />
                          ) : (
                            <img
                              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                              alt="profile-img"
                              className="user__profile-img_2"
                            />
                          )}
                          <div className="user__info">
                            <p className="user__commentname">
                              @{comment.idUserComment.appUser}
                            </p>
                            <span className="comment__text">{comment.textComment}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                  {publication.commentsPublication &&
                  publication.commentsPublication.length >
                    (pageComments[publication.uuid] ?? 0) * 2 ? (
                    <button
                      className="show_more_comments"
                      onClick={() => {
                        showMoreComments(publication.uuid);
                      }}
                    >
                      {"Show More"}
                    </button>
                  ) : (
                    <button
                      className="show_more_comments"
                      onClick={() => {
                        showMoreComments(publication.uuid);
                      }}
                      disabled
                    >
                      {"Show More"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="load-more">
          {numPublications > numPagePublication * 3 ? (
            <button className="buttonLoadMore" onClick={handleLoadMore}> Load More </button>
          ) : (
            <button className="buttonLoadMoreD" onClick={handleLoadMore} disabled> Load More</button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Feed;
