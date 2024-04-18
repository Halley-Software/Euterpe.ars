import "@styles/PlayerControls.css"

function NextButton() {
  return (
    <svg
      id="next"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        className="svg-control-hover-color"
        d="M3 5v14a1 1 0 0 0 1.504 .864l12 -7a1 1 0 0 0 0 -1.728l-12 -7a1 1 0 0 0 -1.504 .864z"
        strokeWidth="0"
        fill="#9ba9be"
      />
      <path
        className="svg-control-hover-color"
        d="M20 4a1 1 0 0 1 .993 .883l.007 .117v14a1 1 0 0 1 -1.993 .117l-.007 -.117v-14a1 1 0 0 1 1 -1z"
        strokeWidth="0"
        fill="#9ba9be"
      />
    </svg>
  )
}

export default NextButton