import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

import { Button, Form, TextInput } from 'components';

const Wrapper = styled(Form)`
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const EmailRow = styled(Form.Row)`
  @media (min-width: 768px) {
    width: calc(25% - 8px);
  }
`;

const MessageRow = styled(Form.Row)`
  @media (min-width: 768px) {
    width: calc(60% - 8px);
  }
`;

const Control = styled(Form.Row)`
  @media (min-width: 768px) {
    width: calc(15% - 8px);
  }
`;

const FeedbackForm = ({ className, onSuccess, t }) => {
  const [isPhoneFormat, setPhoneFormat] = useState(window.innerWidth < 768);
  const [isPending, setPending] = useState(false);
  const [form, updateForm] = useState({
    email: '',
    message: '',
  });

  const handleFormatChange = () => {
    setPhoneFormat(window.innerWidth < 768);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = process.env.REACT_APP_EMAIL_CLIENT;
    const body = Object
      .entries(form)
      .map(([key, value]) => [key, encodeURI(value)].join('='))
      .join('&');

    const response = await fetch(url, {
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { result } = await response.json();

    if (result === 'success') {
      setPending(true);
      onSuccess();
    }
  };

  const handleFormUpdate = ({ name, value }) => {
    updateForm({
      ...form,
      [name]: value,
    });
  };

  const isFormValid = () => Object.values(form).filter(item => item.length > 0).length === Object.keys(form).length;

  useEffect(() => {
    window.addEventListener('resize', handleFormatChange);
    return () => window.removeEventListener('resize', handleFormatChange);
  });

  return (
    <Wrapper
      className={className}
      onSubmit={handleSubmit}
    >
      <EmailRow>
        <TextInput
          placeholder={t('Feedback.Email')}
          name="email"
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
          onChange={handleFormUpdate}
          disabled={isPending}
          required
          value={form.email}
        />
      </EmailRow>

      <MessageRow>
        <TextInput
          as={isPhoneFormat ? 'textarea' : 'input'}
          name="message"
          onChange={handleFormUpdate}
          disabled={isPending}
          required
          rows={isPhoneFormat ? '4' : '1'}
          value={form.message}
        />
      </MessageRow>

      <Control>
        <Button
          as="button"
          disabled={!isFormValid() || isPending}
          type="submit"
          variant="success"
        >
          {t('Feedback.Send')}
        </Button>
      </Control>
    </Wrapper>
  );
};

FeedbackForm.propTypes = {
  className: PropTypes.string,
  onSuccess: PropTypes.func,
  t: PropTypes.func,
};

export default withTranslation()(FeedbackForm);
