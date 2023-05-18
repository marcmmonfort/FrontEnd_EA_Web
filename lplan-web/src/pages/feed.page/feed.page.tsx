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


const Feed = () => {

  const [listPublications, setListPublications] = useState<Publication[]>([]);
  const [listComments, setListComments] = useState<Comment[]>([]);
  const [numPage, setNumPage] = useState<number>(1);
  const [showComments, setShowComments] = useState(false);
  const [selectedPublicationId, setSelectedPublicationId] = useState<string>("");

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    console.log("Iniciamos");
    const userData = AuthService.getCurrentUser();
    console.log(userData.user);
    PublicationService.feed(numPage.toString(),userData.user._id)
      .then(response => {
        console.log(response);
        console.log(response.data);
        setListPublications(response.data);
      })
      .catch(error => {
        //window.location.href = '*';
      });
  }, [numPage]);

  const handleLoadMore = () => {
    console.log("Has pulsado el btn");
    setNumPage(prevPage => prevPage + 1);
    const userData = AuthService.getCurrentUser();
    console.log("HandleLoadMore:" + numPage);
    PublicationService.feed((numPage).toString(), userData.user._id)
      .then(response => {
        console.log(response);
        console.log(response.data);
        setListPublications(prevPublications => [...prevPublications, ...response.data]);
      })
      .catch(error => {
        //window.location.href = '*';
      });
  }

  const getComments = (idPublication: string) => {
    console.log("Ver comentarios");
    //setNumPage(prevPage => prevPage + 1);
    setShowComments(true);
    setSelectedPublicationId(idPublication);
    console.log("Page comentarios:" + numPage);
    CommentService.getCommentsPublication(idPublication, (1).toString())
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
      <Navbar/>
      <div className="containerSection">
        <h1 className="titleSection">Feed</h1>
        <div className="container">
          <div className="feed">
            {listPublications.map((publication) => (
              <div className="post" key={publication._id}>
                <div className="post__header">
                  <img
                    className="post__profile-img"
                    src={publication.idUserPublication.photoUser}
                    alt="Profile"
                  />
                  <div className="post__info">
                    <p className="post__username">{publication.idUserPublication.nameUser} {publication.idUserPublication.surnameUser}</p>
                    <p className="post__timestamp">{publication.createdAt}</p>
                  </div>
                </div>
                <div className="post__body">
                  <p className="post__text">{publication.textPublication}</p>
                  {publication.photoPublication.map((photo) => (
                    <img className="post__image" key={photo} src={photo} alt="Post"/>
                  ))}


                  
                  <button className="show__comments" onClick={() => {
                      getComments(publication._id);
                      }}>Comentarios ({publication.commentsPublication?.length})</button>

                  {showComments && selectedPublicationId === publication._id && (
                  <div>
                    {listComments.map((comment) => (
                      <div key={comment._id}>{comment.textComment}</div>
                    ))}
                  </div>
                  )}
                </div>
              </div>
            ))}
            <div className="load-more">
              <button onClick={handleLoadMore}>Cargar más publicaciones</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Feed;