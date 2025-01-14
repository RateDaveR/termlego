{ pkgs }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    bun
  ];
  shellHook = ''
    echo "👻 bingbong 🌐"
  '';
}

