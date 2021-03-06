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
import { NonRecurringIncome, FixedIncome } from '../../contexts/calendarContext';

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
const NonRecurringIncomeTag = styled.div`
  padding: 2px;
  font-weight: 500;
  border: solid 2px #52db24;
  background: #52db2490;
  border-radius: 4px;
  color: #2c7513;
`;

const FixedIncomeTag = styled.div`
  padding: 2px;
  font-weight: 500;
  border: solid 2px #24db87;
  background: #24db8790;
  border-radius: 4px;
  color: #115f3b;
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
        {!!props.nonRecurringIncomes && (
          <TagsContainer>
            {props.nonRecurringIncomes.map((income, i) => {
              const { tag, value } = income;
              return (
                <NonRecurringIncomeTag key={i}>
                  <span>{`${tag || 'Без категории'}: ${value}`}</span>
                  <button
                    children="x"
                    onClick={() => props.dispatch({ type: 'remove_income', date: props.selectedDate, value: income })}
                  />
                </NonRecurringIncomeTag>
              );
            })}
          </TagsContainer>
        )}
        {!!props.monthlyIncomes && (
          <TagsContainer>
            {props.monthlyIncomes.map((income, i) => {
              const { tag, value } = income;
              return (
                <FixedIncomeTag key={i}>
                  <span>{`${tag || 'Без категории'}: ${value}`}</span>
                  <button
                    children="x"
                    onClick={() => props.dispatch({ type: 'remove_income', date: props.selectedDate, value: income })}
                  />
                </FixedIncomeTag>
              );
            })}
          </TagsContainer>
        )}
        <Formik<NonRecurringIncome | FixedIncome>
          validationSchema={validationSchema}
          initialValues={{ tag: '', value: 0, type: 'fixed', period: 'monthly' }}
          onSubmit={(value) => props.dispatch({ type: 'add_income', date: props.selectedDate, value })}
        >
          {({ handleChange, errors }) => {
            const hasErrors = Object.values(errors).some((v) => v != null);
            return (
              <StyledForm>
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
