import React from "react";
import styled from "styled-components";
import { Theme } from "utils";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0px 10px;
  margin-top: 30px;
`;

const InputContainer = styled.div<{ color: string }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  span {
    &::before {
      position: absolute;
      content: "";
      top: 21px;
      left: 0;
      height: 2px;
      width: 100%;
      background-color: ${(p) => p.color};
      transform: translateX(-100%);
      transition: transform 400ms ease-in-out;
    }
  }

  input:focus + span::before,
  input:valid + span::before {
    transform: translateX(0%);
  }
`;

const Input = styled.input<{ color1: string; color2: string }>`
  position: relative;
  outline: none;
  border: none;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid ${(p) => p.color2};
  background-color: transparent;
  color: ${(p) => p.color1};
`;

interface Props {
  onChange: (v: string) => void;
  value: string;
  colors: Theme["dark"];
  placeholder: string;
}

export const SearchBox: React.FC<Props> = (props) => {
  return (
    <Container>
      <InputContainer color={props.colors.primary}>
        <Input
          onInvalid={(e) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            e.target.setCustomValidity(" ");
          }}
          placeholder={props.placeholder}
          required
          type="text"
          color1={props.colors.fontPrimary}
          color2={props.colors.fontPrimary}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <span></span>
      </InputContainer>
    </Container>
  );
};