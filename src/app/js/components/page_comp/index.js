import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { PageMenu, Page } from '@bbbottle/page-menu'
import { IconText } from '@zhoujiahao/bblego';
import { pagesBuilder } from './pages.jsx';
import 'style/menu_btn.scss'

export const MenuBtn = ({
  onClick,
  className,
  style,
  hidden,
}) => {
  return (
    <button
      type="button"
      style={style}
      className={cn('menu-button', className, {
        show: !hidden
      })}
      onClick={onClick}
    />
  );
};

MenuBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
export const PageTitle = (props) => {
  const { icon, title } = props;
  return (
    <div style={{ position: 'absolute', top: 15, left: 15 }}>
      <IconText
        icon={icon}
        color="#51c49f"
      >
        {title || props.children}
      </IconText>
    </div>
  )
}

export const Pages = () => {
  const pages = pagesBuilder();
  const [isOpen, setOpen] = useState(false)
  const [activePageIndex, setActivePage] = useState(pages.length - 1)
  return (
    <PageMenu
      defaultOpen={isOpen}
      onOpenStatusChange={setOpen}
      onSelect={setActivePage}
      menuIconRenderer={({ open }) => {
        return <MenuBtn onClick={open} hidden={isOpen} />
      }}
    >
      {pages.map(({
        title,
        icon,
        component
      }, index) => {
        return (
          <Page
            title={ isOpen && <PageTitle icon={icon}>{title}</PageTitle>}
          >
            {index === activePageIndex && component}
          </Page>
        )
      })}
    </PageMenu>
  )
}
