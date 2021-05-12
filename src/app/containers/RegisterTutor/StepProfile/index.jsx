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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <>
      <Introduction>
        <img className="intro-image" src={ProfileTutor} alt="intro-profile" />
        <div className="intro-content">
          <h2>{t('Register.Tutor.profile.setup')}</h2>
          <p>{t('Register.Tutor.profile.intro1')}</p>
          <p>{t('Register.Tutor.profile.intro2')}</p>
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
          {/*PROFILE  */}
          <Divider orientation="left">
            {t('Register.Tutor.profile.title')}
          </Divider>
          <Row gutter={16} className="basic-info">
            <Col span={8} className="basic-info-left no-flex">
              <ImageUpload
                className="avt-uploader"
                selectAvatar={selectAvatar}
              />
              <p>{t('Register.Tutor.profile.btnClickEdit')}</p>
              <Alert
                message={t('Register.Tutor.profile.alertUploadMessage')}
                type="info"
              />
            </Col>
            <Col span={16} className="basic-info-right no-flex">
              <Col span={24}>
                <Form.Item
                  label={t('Register.Tutor.profile.lable.name')}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: t('Register.Tutor.profile.rule.name'),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t('Register.Tutor.profile.lable.country')}
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: t('Register.Tutor.profile.rule.country'),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t('Register.Tutor.profile.lable.birthday')}
                  name="birthday"
                  rules={[
                    {
                      required: true,
                      message: t('Register.Tutor.profile.rule.birthday'),
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </Col>
            </Col>
          </Row>
          {/*CV  */}
          <Divider orientation="left" className="mt-5">
            {t('Register.Tutor.cv.title')}
          </Divider>
          <p>{t('Register.Tutor.cv.info')}</p>
          <Alert message={t('Register.Tutor.cv.alertMessage')} type="info" />
          <Row className="mt-3">
            <Form.Item
              label={t('Register.Tutor.cv.lable.interests')}
              name="interests"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: t('Register.Tutor.cv.rule.interest'),
                },
              ]}
            >
              <Input.TextArea
                placeholder={t('Register.Tutor.cv.placeholder.interest')}
              />
            </Form.Item>
          </Row>
          <Row className="">
            <Form.Item
              label={t('Register.Tutor.cv.lable.education')}
              name="education"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: t('Register.Tutor.cv.rule.education'),
                },
              ]}
            >
              <Input.TextArea
                placeholder={t('Register.Tutor.cv.placeholder.education')}
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label={t('Register.Tutor.cv.lable.experience')}
              name="experience"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: t('Register.Tutor.cv.rule.experience'),
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label={t('Register.Tutor.cv.lable.profession')}
              name="profession"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: t('Register.Tutor.cv.rule.profession'),
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Row>
          {/*LANGUAGES  */}
          <Divider orientation="left">
            {t('Register.Tutor.languages.title')}
          </Divider>
          <Row>
            <Form.Item
              label={t('Register.Tutor.languages.lable.languages')}
              name="languages"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: t('Register.Tutor.languages.rule.languages'),
                },
              ]}
            >
              <Input.TextArea
                placeholder={t(
                  'Register.Tutor.languages.placeholder.languages',
                )}
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label={t('Register.Tutor.languages.lable.accent')}
              name="accent"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: t('Register.Tutor.languages.rule.accent'),
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
          {/*TEACH  */}
          <Divider orientation="left">
            {t('Register.Tutor.teach.title')}
          </Divider>
          <Alert message={t('Register.Tutor.teach.alertMessage')} type="info" />
          <Row className="mt-3">
            <Form.Item
              label={t('Register.Tutor.teach.lable.introduction')}
              name="bio"
              className="full-width"
              rules={[
                {
                  required: true,
                  message: t('Register.Tutor.teach.rule.introduction'),
                },
              ]}
            >
              <Input.TextArea
                placeholder={t('Register.Tutor.teach.placeholder.introduction')}
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              name="targetStudent"
              label={t('Register.Tutor.teach.lable.target')}
              rules={[
                {
                  required: true,
                  message: t('Register.Tutor.teach.rule.target'),
                },
              ]}
            >
              <Radio.Group>
                <Radio value="Beginner">
                  {t('Register.Tutor.teach.level.beginner')}
                </Radio>
                <Radio value="Intermediate">
                  {t('Register.Tutor.teach.level.imtermediate')}
                </Radio>
                <Radio value="Advanced">
                  {t('Register.Tutor.teach.level.advanced')}
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              name="specialties"
              label={t('Register.Tutor.teach.lable.specialties')}
              className="full-width"
              rules={[
                {
                  required: true,
                  message: t('Register.Tutor.teach.rule.specialties'),
                },
              ]}
            >
              <Checkbox.Group>
                <Row className="justify-content-between mb-2">
                  <Col>
                    <Checkbox value="Friendly conversation">
                      {t('Register.Tutor.teach.specialties.category.fc')}
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Business English">
                      {t('Register.Tutor.teach.specialties.category.be')}
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Public speaking">
                      {t('Register.Tutor.teach.specialties.category.ps')}
                    </Checkbox>
                  </Col>
                </Row>
                <Row className="justify-content-between mb-2">
                  <Col>
                    <Checkbox value="Test prep (IELTS, TOEFL, etc.)">
                      {t('Register.Tutor.teach.specialties.category.tp')}
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Grammar instruction">
                      {t('Register.Tutor.teach.specialties.category.gi')}
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Accent coaching">
                      {t('Register.Tutor.teach.specialties.category.ac')}
                    </Checkbox>
                  </Col>
                </Row>
                <Row className="justify-content-between mb-2">
                  <Col>
                    <Checkbox value="Correcting speech">
                      {t('Register.Tutor.teach.specialties.category.cs')}
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Discussing current events">
                      {t('Register.Tutor.teach.specialties.category.dce')}
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Vocational lessons">
                      {t('Register.Tutor.teach.specialties.category.vl')}
                    </Checkbox>
                  </Col>
                </Row>
                <Row className="justify-content-between mb-2">
                  <Col>
                    <Checkbox value="Culture (i.e. manners, customs)">
                      {t('Register.Tutor.teach.specialties.category.c')}
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="Teaching idioms and slang">
                      {t('Register.Tutor.teach.specialties.category.tias')}
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
