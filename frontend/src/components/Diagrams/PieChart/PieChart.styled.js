import styled from '@emotion/styled';

export const SalesCategory = styled.li`
  position: relative;
  padding: 0 0 16px 20px;
  width: 100%;
  border-bottom: 1px solid rgba(232, 235, 239, 0.5);
  list-style-type: none;

  &:before {
    content: '';
    position: absolute;
    left: 12px;
    width: 12px;
    height: 12px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    transform: translate(-100%);
  }
`;
