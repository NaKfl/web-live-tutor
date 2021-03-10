import ProfileTutor from 'assets/tutor-profile.png';
import { Introduction, Content } from './styles';
import Divider from 'app/components/Divider';
import Form from 'app/components/Form';
import Alert from 'app/components/Alert';
import { Col, Row } from 'antd';
import Input from 'app/components/Input';
import Select from 'app/components/Select';
import Radio from 'app/components/Radio';
import Checkbox from 'app/components/Checkbox';
import DatePicker from 'app/components/DatePicker';
import ImageUpload from './ImageUpload';
const accents = [
  'North America',
  'Canada',
  'USA ',
  'USA - Southern USA',
  'North America - Other',
  'United Kingdom / Republic of Ireland',
  'British - Received Pronunciation',
  'Ireland',
  'Scotland',
  'British Isles - Other',
  'South Africa',
  'Australia / New Zealand',
  'Australia',
  'New Zealand',
  'Other',
];

export const StepProfile = ({
  formProfile,
  tutorFormValues,
  onChangeNextStep,
  selectAvatar,
  avatar,
}) => {
  return (
    <>
      <Introduction>
        <img className="intro-image" src={ProfileTutor} alt="intro-profile" />
        <div className="intro-content">
          <h2>Set up your tutor profile</h2>
          <p>
            Your tutor profile is your chance to market yourself to students on
            Live Tutor. You can make edits later on your profile settings page.
          </p>
          <p>
            New students may browse tutor profiles to find a tutor that fits
            their learning goals and personality. Returning students may use the
            tutor profiles to find tutors they've had great experiences with
            already.
          </p>
        </div>
      </Introduction>
      <Content>
        <Form
          className="profile-form"
          form={formProfile}
          onFinish={onChangeNextStep}
          initialValues={tutorFormValues}
          requiredMark={false}
          layout="vertical"
        >
          <Divider orientation="left">Basic info</Divider>
          <Row gutter={16}>
            <Col span={8}>
              <ImageUpload selectAvatar={selectAvatar} />
              <p>Click to edit</p>
              <Alert
                message="Please upload a professional photo. see guidelines"
                type="info"
              />
            </Col>
            <Col span={16}>
              <Col span={24}>
                <Form.Item
                  label="Tutoring name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="I'm from"
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your country!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Date of Birth"
                  name="birthday"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your birthday!',
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </Col>
            </Col>
          </Row>

          <Divider orientation="left" className="mt-5">
            CV
          </Divider>
          <p>
            Students will view this information on your profile to decide if
            you're a good fit for them.
          </p>
          <Alert
            message="In order to protect your privacy, please do not share your personal information (email, phone number, social email, skype, etc) in your profile."
            type="info"
          />
          <Row className="mt-3">
            <Form.Item
              label="Interests"
              name="interests"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: 'Please input your interests!',
                },
              ]}
            >
              <Input.TextArea
                placeholder={`Interests, hobbies, memorable life experiences, or anything else you'd like to share!`}
              />
            </Form.Item>
          </Row>
          <Row className="">
            <Form.Item
              label="Education"
              name="education"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: 'Please input your education!',
                },
              ]}
            >
              <Input.TextArea
                placeholder={`Example: "Bachelor of Arts in English from Cambly University; Certified yoga instructor, Second Language Acquisition and Teaching  (SLAT) certificate from Cambly University"`}
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Experience"
              name="experience"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: 'Please input your experience!',
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Current or Previous Profession"
              name="profession"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: 'Please input your profession!',
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Row>
          <Divider orientation="left">Languages I speak</Divider>
          <Row>
            <Form.Item
              label="Languages"
              name="languages"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: 'Please input your languages!',
                },
              ]}
            >
              <Input.TextArea placeholder="Example: English, Vietnamese, Chinese, Korean" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="English Dialect/Accent"
              name="accent"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: 'Please input your accent!',
                },
              ]}
            >
              <Select>
                {accents.map(item => (
                  <Select.Option value={item}>{item}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Row>
          <Divider orientation="left">Who I teach</Divider>
          <Alert
            message="This is the first thing students will see when looking for tutors."
            type="info"
          />
          <Row className="mt-3">
            <Form.Item
              label="Introduction"
              name="bio"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: 'Please input your introduction!',
                },
              ]}
            >
              <Input.TextArea
                placeholder={`Example: "I was a doctor for 35 years and can help you practice business or medical English. I also enjoy teaching beginners as I am very patient and always speak slowly and clearly. "`}
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              name="targetStudent"
              label="I am best at teaching students who are"
              rules={[
                {
                  required: true,
                  message: 'Please input your target student!',
                },
              ]}
            >
              <Radio.Group>
                <Radio value="Beginner">Beginner</Radio>
                <Radio value="Intermediate">Intermediate</Radio>
                <Radio value="Advanced">Advanced</Radio>
              </Radio.Group>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              name="specialties"
              label="My specialties are"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: 'Please input your target specialties!',
                },
              ]}
            >
              <Checkbox.Group>
                <Row className="justify-content-between mb-2">
                  <Col>
                    <Checkbox value="Friendly conversation">
                      Friendly conversation
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Business English">
                      Business English
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Public speaking">Public speaking</Checkbox>
                  </Col>
                </Row>
                <Row className="justify-content-between mb-2">
                  <Col>
                    <Checkbox value="Test prep (IELTS, TOEFL, etc.)">
                      Test prep (IELTS, TOEFL, etc.)
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Grammar instruction">
                      Grammar instruction
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Accent coaching">Accent coaching</Checkbox>
                  </Col>
                </Row>
                <Row className="justify-content-between mb-2">
                  <Col>
                    <Checkbox value="Correcting speech">
                      Correcting speech
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Discussing current events">
                      Discussing current events
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Vocational lessons">
                      Vocational lessons
                    </Checkbox>
                  </Col>
                </Row>
                <Row className="justify-content-between mb-2">
                  <Col>
                    <Checkbox value="Culture (i.e. manners, customs)">
                      Culture (i.e. manners, customs)
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Teaching idioms and slang">
                      Teaching idioms and slang
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Row>
        </Form>
      </Content>
    </>
  );
};

export default StepProfile;
