import React, {useState} from 'react';
import { Form, Button, Col, Row} from 'react-bootstrap';
import * as Api from "../../api";

// 학력 수정 컴포넌트 입니다. 

const ProjectForm = ({editItem, setEditData, setIsEditing}) => {

  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");
  
  const handleSubmit = async(e) => {
     e.preventDefault();
     
     const userId = editItem.userId;
     console.log(`edit : ${userId}`);

      // 사용자가 입력한 데이터, post 요청! 
      await Api.put(`educations/${userId}}`, {
       userId,
       school,
       major,
       position,
     });

     const res = await Api.get(`educationlist/${userId}`);
     console.log("get성공",res);
     setEditData(res.data);
     console.log(`res: ${res}`);
     setIsEditing(false); 

  };
  

  return (
     <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Control 
            type="text"
            onChange={(e) => setSchool(e.target.value)}
            name="shcool"
            value={school}
            placeholder="학교이름"/>
        </Form.Group>

        <Form.Group >
            <Form.Control 
            type="text"
            name="major"
            value={major} 
            onChange={(e) => setMajor(e.target.value)}
            placeholder="전공" />
        </Form.Group>

        <div key={`inline-radio`} className="mb-3 mt-3">
        <Form.Check
          inline
          label="재학중"
          type="radio"
          name="position"
          value="재학중"
          checked={position === "재학중"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="학사졸업"
          type="radio"
          name="position"
          value="학사졸업"
          checked={position === "학사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="석사졸업"
          type="radio"
          name="position"
          value="석사졸업"
          checked={position === "석사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="박사졸업"
          type="radio"
          name="position"
          value="박사졸업"
          checked={position === "박사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>

        <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
        <Button 
        variant="primary" 
        type="submit" 
        className="me-3">
         확인
        </Button>
        <Button
         variant="secondary"
         onClick={() => setIsEditing(false)}
          >
         취소
        </Button>
        </Col>
      </Form.Group>
      </Form>

  )}

export default ProjectForm;