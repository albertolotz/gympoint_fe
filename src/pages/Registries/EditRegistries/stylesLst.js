export const styles = {
  control: b => ({
    borderStyle: 'solid',
    borderRadius: '4px',
    borderWidth: '1px',
    borderColor: '#333',
    height: '30px',
    minHeight: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  dropdownIndicator: base => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  clearIndicator: base => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  indicatorSeparator: b => ({
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#ccc',
    height: '20px',
    minHeight: 0,
  }),
  input: b => ({
    height: '25px',
    minHeight: 0,
    fontSize: '16px',
  }),
};
