import { Col, Row, Skeleton } from 'antd';
import Alert from 'app/components/Alert';
import Button from 'app/components/Button';
import Checkbox from 'app/components/Checkbox';
import Divider from 'app/components/Divider';
import Form from 'app/components/Form';
import Input from 'app/components/Input';
import Radio from 'app/components/Radio';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import LANGUAGES from 'utils/languages';
import { MAJOR_NAMES } from './constants';
import MultiOptions from './MultiOptions';
import { Content, StyleMultiSelect } from './styles/tutorInfo';
import { useTutorInfo } from './hooks';
import VideoUpload from './VideoUpload';
import InputNumber from 'app/components/InputNumber';

const TutorInfo = () => {
  const { t } = useTranslation();
  const { handlers, selectors } = useTutorInfo();
  const { tutor, form, loading, loadingEdit } = selectors;
  const { selectVideo, onFinish } = handlers;

  return (
    <Content>
      {(loading && <Skeleton active paragraph={{ rows: 10 }} />) || (
        <Form
          id="tutor-info-form"
          form={form}
          onFinish={onFinish}
          initialValues={tutor || {}}
          requiredMark={false}
          layout="vertical"
        >
          <Divider orientation="left">{t('Register.Tutor.cv.title')}</Divider>
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
              <StyleMultiSelect
                mode="tags"
                style={{ width: '100%' }}
                placeholder={t(
                  'Register.Tutor.languages.placeholder.languages',
                )}
              >
                {MultiOptions({ list: LANGUAGES })}
              </StyleMultiSelect>
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
                {Object.entries(MAJOR_NAMES).map(
                  ([key, { vietnameseName, englishName }]) => (
                    <Row className="mb-2" key={key}>
                      <Col>
                        <Checkbox value={key}>
                          {t('Common.default') === t('Common.vn')
                            ? vietnameseName
                            : englishName}
                        </Checkbox>
                      </Col>
                    </Row>
                  ),
                )}
              </Checkbox.Group>
            </Form.Item>
          </Row>
          {/*PRICE  */}
          <Divider orientation="left">
            {t('Register.Tutor.price.title')}
          </Divider>
          <Row>
            <Col xs={24} md={16} lg={12}>
              <Form.Item
                name="price"
                label={t('Register.Tutor.price.expectedPrice')}
                className="full-width"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (!value || isNaN(+value) || +value < 1000)
                        return Promise.reject(
                          t('Payment.minMax', {
                            min: '1.000 VND',
                          }),
                        );
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber
                  formatter={value =>
                    value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          {/*VIDEO  */}
          <Divider orientation="left">
            {t('Register.Tutor.video.title')}
          </Divider>
          <Alert
            style={{ marginBottom: 30 }}
            message={
              <>
                <span>{t('Register.Tutor.video.tip.title')}</span>
                <ol style={{ marginBottom: 0, marginLeft: 20 }}>
                  <li>{t('Register.Tutor.video.tip.t1')}</li>
                  <li>{t('Register.Tutor.video.tip.t2')}</li>
                  <li>{t('Register.Tutor.video.tip.t3')}</li>
                  <li>{t('Register.Tutor.video.tip.t4')}</li>
                  <li>{t('Register.Tutor.video.tip.t5')}</li>
                </ol>
              </>
            }
            type="info"
          />
          <Row justify="center">
            <VideoUpload
              className="video-upload"
              selectVideo={selectVideo}
              existedVideo={tutor?.video}
            />
          </Row>
          <Row justify="end" className="mt-4">
            <Button
              form="tutor-info-form"
              className="submit-btn"
              type="accent"
              htmlType="submit"
              loading={loadingEdit}
            >
              {t('Profile.btnSave')}
            </Button>
          </Row>
        </Form>
      )}
    </Content>
  );
};

export default memo(TutorInfo);
