import styled from '@emotion/styled';

export const SalesCategory = styled.li`
  position: relative;
  padding: 0 0 16px 20px;
  width: 100%;
  border-bottom: 1px solid rgba(232, 235, 239, 0.5);
  list-style-type: none;
  font-size: 13px;

  &:before {
    content: '';
    position: absolute;
    left: 12px;
    top: 1px;
    width: 12px;
    height: 13px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    transform: translate(-100%);
  }
`;
