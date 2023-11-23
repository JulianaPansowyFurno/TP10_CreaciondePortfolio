import React, {useState, useEffect, useContext} from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import axios from 'axios';
import {useProductsData} from "../MyContext"
import { useNavigate } from "react-router-dom";
import {favoritoContext} from "../favoritosContext.js";
import swal from 'sweetalert';
import Button from "react-bootstrap/Button";


function Projects() {
  const { data } = useProductsData();
  const navigate = useNavigate();
  const { favorito, addFavorite, removeFavorite, resetFavorite  } = useContext(favoritoContext);

  const isFavorito = (id) => favorito.includes(id);

  const FavoritoClick = (id) => {
    if (id !== null && id!== undefined) {
      if (!isFavorito(id)) {
        addFavorite(id);
      } else {
        removeFavorite(id);
      }
    }
  };

  const handleResetFavorites = () => {
    resetFavorite(); 
    console.log("se borro")
  };

  useEffect(() => {
    FavoritoClick()
  }, []);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
      
        
        <h1 className="project-heading">
         Mis recientes <strong className="purple"> craciones </strong>
        </h1>
        <p style={{ color: "white" }}>
          Estos son los Trabajos Practicos que fui haciendo en el año.
        </p>
        {console.log(favorito)}
        <Button onClick={() => handleResetFavorites}>Reset Favorites</Button>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {data.map((c) =>
          <Col md={4} className="project-card">
          <ProjectCard 
          key={c.id}
            imgPath={c.imagen}
            title={c.titulo}
            corto={c.corto}
            ghLink={c.url}
            onClickDetalle={() => navigate(`/detalle/${c.id}`)} 
            isFavorito={isFavorito(c.id)}
            onClickFavorito={() => {FavoritoClick(c.id)}} 
          />
        </Col>
          )}

          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
