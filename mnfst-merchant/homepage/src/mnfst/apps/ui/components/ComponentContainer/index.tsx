import React from 'react';
import { IElementNode } from 'apps/ui/interfaces/elementNode';

interface IComponentContainerProps {
  children: React.ReactNode;
  className?: string;
  onRef: (elementNode: IElementNode) => void;
}

class ComponentContainer extends React.Component<IComponentContainerProps> {
  public componentContainerNode: HTMLDivElement;

  public componentDidMount() {
    this.updateNode();
    window.addEventListener('resize', this.updateNode);
  }

  public render() {
    const { children, className } = this.props;

    return (
      <div
        ref={this.handleNodeRef}
        className={className}>
        {children}
      </div>
    );
  }

  private handleNodeRef = (node: HTMLDivElement) => {
    this.componentContainerNode = node;
  }

  private updateNode = ()  => {
    if (this.componentContainerNode) {
      const { height, left, top, width } = this.componentContainerNode.getBoundingClientRect();
      const { onRef } = this.props;

      if (onRef) {
        onRef({
          height,
          width,
          left: left + window.scrollX,
          top: top + window.scrollY,
          node: this.componentContainerNode,
        });
      }
    }
  }
}

export default ComponentContainer;
