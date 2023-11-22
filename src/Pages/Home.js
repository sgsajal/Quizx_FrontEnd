import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CardComponent = () => {
  const cardData = [
    {
      title: 'General',
      image: "/images/general.jpg",
    },
    {
      title: 'Science',
      image: "/images/science.jpg",
    },
    {
      title: 'History',
      image: "/images/History.png",
    },
    {
      title: 'Math',
      image: "/images/math.jpg",
    },
    {
      title: 'Programming',
      image: "/images/programing.png",
    },
    {
      title: 'Sports',
      image: "/images/sports.jpg",
    },
  ];

  return (
    <Container>
      <Row>
        {cardData.map((card, index) => (
          <Col key={index} xs={12} sm={6} md={4}>
            <Link to={`/quiz/${card.title}`} style={{textDecoration:"none"}}>
            <Card  className="my-3"style={{ width: '18rem' }}>
              <Card.Img variant="top" src={card.image}  style={{ width: '250px', height: '300px' }}/>
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                
              </Card.Body>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardComponent;
