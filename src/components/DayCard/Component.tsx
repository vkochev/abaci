import { ComponentProps } from '.';
import React from 'react';
import styled, { css } from 'styled-components';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import {
  baseOnHoverMixin,
  baseFlexMixin,
  spaceBetweenFlexMixin,
  shadow1Mixin,
  fadeInKeyframe,
} from '../../styledMixins';
import { Income, IncomeTypes } from '../../contexts/calendarContext';

const validationSchema = yup.object({
  value: yup.number().integer().min(1).required(),
  type: yup.string().required(),
  tag: yup.string().optional(),
});
const PositionContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: inherit;
  width: inherit;
  background: #fff;
  min-height: 50vh;
  max-height: 80vh;
  overflow-y: auto;
  ${shadow1Mixin}
`;

const ContentContainer = styled.div`
  margin: 10px 30px;
`;

const Header = styled.div`
  ${spaceBetweenFlexMixin}
`;
const Link = styled.a`
  ${baseOnHoverMixin}
`;
const Row = styled.div`
  margin: 8px 0;
  ${spaceBetweenFlexMixin}
`;
const ActionsRow = styled.div`
  ${baseFlexMixin};
  flex-direction: row-reverse;
`;
const Col1 = styled.div``;
const Col2 = styled.div`
  flex-basis: 70%;
  flex-grow: 0;
`;
const Input = styled.input``;

const pseudoTooltipMixin = css`
  content: attr(data-error-message);
  display: inline-block;
  position: absolute;
  transform: translate(0, -106%);
  background: #ff0000;
  padding: 4px 8px;
  animation: ${fadeInKeyframe} 300ms;
  border-radius: 2px;
  color: #ffe0e0;
  font-weight: 400;
  max-width: 50vw;
  opacity: 0.8;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const pseudoTooltipArrowMixin = css`
  content: '';
  background: none;
  border-radius: unset;
  width: 0;
  height: 0;
  border: solid 4px transparent;
  border-top: solid 4px #ff0000;
  display: inline-block;
  position: absolute;
  transform: translate(-145px, -22%);
  animation: ${fadeInKeyframe} 300ms;
  opacity: 0.8;
`;
const Label = styled.label`
  &[data-error-message]:after {
    content: '!';
    position: absolute;
    background: #ff0000;
    color: #ffe0e0;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    text-align: center;
    line-height: 1;
    transform: translate(-20px, 4px);
    font-weight: 500;
  }
  &:focus-within,
  &:hover {
    &[data-error-message]:before {
      ${pseudoTooltipMixin};
    }
    &[data-error-message]:after {
      ${pseudoTooltipArrowMixin}
      overflow: unset;
      white-space: unset;
      text-overflow: unset;
    }
  }
`;
const StyledForm = styled(Form)`
  margin: 10px auto;
`;
const Button = styled.button``;
const TagsContainer = styled.div`
  ${baseFlexMixin}
  flex-wrap: wrap;

  & > * {
    margin: 5px 0;
    margin-right: 10px;
  }
`;
const IncomeTag = styled.div`
  padding: 2px;
  border: solid 2px #52db24;
  background: #52db2490;
  border-radius: 4px;
  color: #2c7513;
  font-weight: 500;
`;

const Fieldset = styled.fieldset`
  padding: 0;
  margin: 0;
  border: none;
`;
export function Component(props: ComponentProps) {
  return (
    <PositionContainer>
      <ContentContainer>
        <Header>
          <h1>{props.selectedDateString}</h1>
          <Link children="Закрыть" onClick={() => props.dispatch({ type: 'unselect_date' })} />
        </Header>
        <Formik<Income & { type: IncomeTypes }>
          validationSchema={validationSchema}
          initialValues={{ tag: '', value: 0, type: 'fixed' }}
          onSubmit={({ type, ...value }) =>
            props.dispatch({ type: 'add_income', date: props.selectedDate, value, incomeType: type })
          }
        >
          {({ handleChange, errors, values }) => {
            const hasErrors = Object.values(errors).some((v) => v != null);
            return (
              <StyledForm>
                {!!props.nonRecurringIncomes && (
                  <TagsContainer>
                    {props.nonRecurringIncomes.map(({ tag, value }, i) => (
                      <IncomeTag key={i} children={`${tag || 'Без категории'}: ${value}`} />
                    ))}
                  </TagsContainer>
                )}
                {!!props.fixedIncomes && (
                  <TagsContainer>
                    {props.fixedIncomes.map(({ tag, value }, i) => (
                      <IncomeTag key={i} children={`${tag || 'Без категории'}: ${value}`} />
                    ))}
                  </TagsContainer>
                )}
                <Row>
                  <Col1>Доход</Col1>
                  <Col2>
                    <Label data-error-message={errors.value}>
                      <Input name="value" type="number" onChange={handleChange} />
                    </Label>
                  </Col2>
                </Row>
                <Row>
                  <Col1>Тип</Col1>
                  <Col2>
                    <Fieldset id="type" onChange={handleChange}>
                      <label>
                        <input type="radio" name="type" value="fixed" defaultChecked={true} />
                        Постоянный
                      </label>
                      <label>
                        <input type="radio" name="type" value="nonRecurring" />
                        Разовый
                      </label>
                    </Fieldset>
                  </Col2>
                </Row>
                <Row>
                  <Col1>Категория</Col1>
                  <Col2>
                    <Label data-error-message={errors.tag}>
                      <Input name="tag" type="text" onChange={handleChange} />
                    </Label>
                  </Col2>
                </Row>
                <ActionsRow>
                  <Col2>
                    <Button type="submit" children="Добавить" disabled={hasErrors} />
                  </Col2>
                </ActionsRow>
              </StyledForm>
            );
          }}
        </Formik>
      </ContentContainer>
    </PositionContainer>
  );
}
