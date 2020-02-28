// TODO mocha

const rgx = /(\[.+])/gm

const testString = `

# Title

some contents

## Description

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam leo sit amet neque pharetra pellentesque nec et sapien. Fusce ut nisi id mauris ullamcorper molestie ac quis nisi. Nam consectetur metus id euismod blandit. Integer pulvinar nunc non dolor vehicula dapibus. Aenean a massa enim. Curabitur ac accumsan lacus, id vestibulum justo. Donec tincidunt luctus nunc, eget laoreet turpis. Vestibulum at libero at tellus congue egestas ac quis leo. Mauris fermentum, risus vitae vestibulum suscipit, mi turpis luctus erat, non interdum libero leo nec erat. Nunc fermentum congue libero eget facilisis. Proin nec egestas orci. Sed erat velit, commodo ac sem ut, pellentesque hendrerit justo.

Nulla mattis vulputate lacus id tincidunt. Nulla in ante in nulla finibus dapibus. Proin efficitur, lectus ac venenatis consectetur, lorem tortor blandit odio, id tristique dui nisl a diam. Nullam sit amet dui at orci finibus posuere a vel sapien. Donec nunc nibh, venenatis vel orci a, aliquam bibendum massa. Donec sed magna vitae libero dictum dictum eu in massa. Morbi elementum, quam eu pharetra vehicula, magna nibh pharetra quam, sagittis feugiat nibh quam et nunc. Duis finibus tellus non vestibulum vehicula. Donec hendrerit turpis venenatis, imperdiet massa in, rhoncus erat. Nunc eget dui quis sapien vehicula sollicitudin. Morbi arcu nulla, iaculis quis lobortis nec, consequat a quam. Sed a ante velit.

Nulla vehicula aliquam elit, at maximus diam porttitor eu. Ut posuere urna ex, quis semper augue interdum quis. In finibus dignissim dolor quis porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse luctus diam sed eros porttitor malesuada. Aliquam id finibus ipsum, non congue sem. In dapibus nisi velit. Phasellus id lectus ipsum. Vivamus dictum felis sem, quis tincidunt metus accumsan vel. Ut sed dui nulla. Duis pretium risus eget nunc convallis mollis.

Proin vel euismod libero, eu consectetur justo. Proin ex dui, condimentum eu arcu sed, posuere rhoncus eros. Sed rutrum est sit amet ex pellentesque, vel vulputate neque pharetra. Sed et iaculis nisi, non tempor quam. Morbi vitae mollis lectus. Sed auctor massa nisl, et condimentum lectus ultricies eu. Ut gravida ex orci, ut dapibus erat rutrum eu. Nulla porttitor risus nec porta laoreet. Sed purus nulla, viverra sit amet iaculis non, facilisis eget dui.

Morbi gravida turpis id varius sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed feugiat porttitor consequat. Donec sed diam congue, suscipit mauris quis, finibus enim. Donec blandit tincidunt est, id faucibus felis ultricies quis. Nunc vitae nulla vel est iaculis blandit. Integer vel maximus erat. Aliquam erat volutpat. Ut ultricies elit sit amet risus dictum maximus. Nunc bibendum justo sit amet varius auctor. Vestibulum egestas bibendum nunc, sit amet viverra dui luctus ac. Duis est turpis, dictum ut libero sit amet, aliquet ornare diam.

[abc]
[abc, efg]
[foo bar]
[foo-bar]
[foo bar, baz blam, abc]
[ foo bar]
[foo bar ]
[ foo bar ]
[ foo, bar baz]
[foo, bar baz ]
[ foo, bar baz ]
[      foo,        bar baz         , howdy-hoo hoo        ]
`

const allTags = [];

for(const group of testString.matchAll(rgx)) {
    const match = group[0]
    console.log(`found match: ${match}`);
    const tags = match.replace('[','').replace(']','').split(',').map(x => x.trim())
    console.log(`extracted tags: ${tags.reduce((p, c, i) => p + (i===0 ? '': ',') + `"${c}"`, '')}`);
    allTags.push(...tags);
}

console.log("#########");

console.log(`Extracted ${allTags.length} total tags.\nTags: ${allTags.reduce((p, c, i) => p + (i===0 ? '': ',') + `"${c}"`, '')}`)

