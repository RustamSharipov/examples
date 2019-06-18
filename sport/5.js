// 5. Используется странный воркераунд, когда цвет элементы меняется напрямую. Это не react way.
// Правильно держать применяемый color в стейте и менять его при необходимости через setState.
class ColorInput extends React.Component {
  state = {
    color: null,
  };

  render() {
    const { color } = this.state;

    return (
      <div className="line-group">
        <input
          type="text"
          style={{ backgroundColor: color }}
          onChange={this.updateColor} />
      </div>
    );
  }

  updateColor = (event) => {
    const { value: color } = event.target;
    this.setState({ color });
  }
}
