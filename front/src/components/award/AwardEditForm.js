import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {
  //useState로 title 상태를 생성
  const [title, setTitle] = useState(currentAward.title);
  //useState로 description 상태를 생성
  const [description, setDescription] = useState(currentAward.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // currentAward의 user_id를 userId 변수에 할당
    const userId = currentAward.userId;

    try{
      // "awards/수상 id" 엔드포인트로 PUT 요청
      await Api.put(`award/${currentAward.id}`, {
         userId,
         title,
         description,
       });
      // "awardlist/유저id" 엔드포인트로 GET 요청
       const res = await Api.get("awardlist", userId);
      // awards를 response의 data로 세팅
      setAwards(res.data);
      // 편집 과정이 끝났으므로, isEditing을 false로 세팅
      setIsEditing(false);
    }
    catch(error){
      console.log(error);
      if (error.response) {
       const { data } = error.response;
       console.error("data : ", data);
     }
    }

  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="awardEditTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="awardEditDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardEditForm;
