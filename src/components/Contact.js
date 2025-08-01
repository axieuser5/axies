import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactSection = styled.section`
  padding: ${props => props.theme.spacing.xxxl} 0;
  background: ${props => props.theme.colors.background.secondary};
`;

const Container = styled.div`
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.xxxl};
  color: ${props => props.theme.colors.text.primary};
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxxl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const ContactInfo = styled.div`
  h3 {
    font-size: 2rem;
    font-weight: ${props => props.theme.fonts.weights.bold};
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text.primary};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${props => props.theme.colors.text.secondary};
    margin-bottom: ${props => props.theme.spacing.xl};
  }
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.secondary};

  svg {
    color: ${props => props.theme.colors.primary};
    font-size: 1.2rem;
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: ${props => props.theme.fonts.weights.medium};
  color: ${props => props.theme.colors.text.primary};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color ${props => props.theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &.error {
    border-color: ${props => props.theme.colors.error};
  }
`;

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color ${props => props.theme.transitions.normal};
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &.error {
    border-color: ${props => props.theme.colors.error};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 12px 24px;
  background: linear-gradient(45deg, ${props => props.theme.colors.secondary}, #f59e0b);
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  font-size: 1rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(251, 191, 36, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: ${props => props.theme.spacing.xs};
`;

const SuccessMessage = styled(motion.div)`
  background: ${props => props.theme.colors.success};
  color: white;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  text-align: center;
  margin-top: ${props => props.theme.spacing.md};
`;

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Namn är obligatoriskt';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-post är obligatoriskt';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ange en giltig e-postadress';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Företag är obligatoriskt';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Meddelande är obligatoriskt';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const contactInfo = [
    { icon: FaEnvelope, text: 'info@axiestudio.se' },
    { icon: FaPhone, text: '+46 8 123 45 67' },
    { icon: FaMapMarkerAlt, text: 'Stockholm, Sverige' }
  ];

  return (
    <ContactSection id="kontakt">
      <Container ref={ref}>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Kontakta Oss
        </SectionTitle>

        <ContactContent>
          <ContactInfo>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>Låt oss diskutera dina behov</h3>
              <p>
                Vi hjälper dig att implementera AI-lösningar som förbättrar din 
                kundservice och ökar din effektivitet.
              </p>
              <ContactDetails>
                {contactInfo.map((item, index) => (
                  <ContactItem key={index}>
                    <item.icon />
                    <span>{item.text}</span>
                  </ContactItem>
                ))}
              </ContactDetails>
            </motion.div>
          </ContactInfo>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <Label htmlFor="name">Ditt namn *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Ange ditt namn"
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Din e-post *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="ange@email.se"
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="company">Företag *</Label>
              <Input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={errors.company ? 'error' : ''}
                placeholder="Företagsnamn"
              />
              {errors.company && <ErrorMessage>{errors.company}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Beskriv dina behov *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                placeholder="Berätta mer om dina kundservicebehov..."
                rows="5"
              />
              {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Skickar...' : 'Skicka Meddelande'}
            </SubmitButton>

            {showSuccess && (
              <SuccessMessage
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                Tack för ditt meddelande! Vi återkommer snart.
              </SuccessMessage>
            )}
          </ContactForm>
        </ContactContent>
      </Container>
    </ContactSection>
  );
};

export default Contact; 